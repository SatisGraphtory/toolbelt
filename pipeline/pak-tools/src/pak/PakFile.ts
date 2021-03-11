// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L76-L92
import {Shape} from "../util/parsers";
import {FPakInfo, FPakInfoSize} from "./structs/FPakInfo";
import {FPakEntry} from "./structs/FPakEntry";
import {Reader} from "../readers/Reader";
import {UnrealString} from "./primitive/strings";
import {UInt32} from "./primitive/integers";
import { ChildReader } from "../readers/ChildReader";
import {Transform, Type} from "class-transformer";
import path from "path";
import {UAsset} from "./pakfile/UAsset";
import {UObject} from "./pakfile/UObject";
import {asyncArrayForEach, asyncSetForEach} from "../util/asyncEnumerators";
import {FObjectExport} from "./structs/file/FObjectExport";

export enum PakVersion {
  Initial = 1,
  NoTimestamps = 2,
  CompressionEncryption = 3,
  IndexEncryption = 4,
  RelativeChunkOffsets = 5,
  DeleteRecords = 6,
  EncryptionKeyGuid = 7,
  FNameBasedCompressionMethod = 8,
  FrozenIndex= 9,
  PathHashIndex = 10,
  FNV64BugFix = 11
}

export const LatestPakVersion = PakVersion.FrozenIndex;

/**
 * Parser and content of a .pak file.
 *
 * @see https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L485-L488
 */

export class PakFile {
  info!: Shape<typeof FPakInfo>;
  mountPoint!: string;

  entries = new Map<string, Shape<typeof FPakEntry>>();
  // assetFiles = new Map<string, UAssetFile>();
  // expFiles = new Map<string, UExpFile>();
  headerSize = Infinity;

  packageCache = new Map<string, UObject>();

  public optimizeLoadFromFile(reader: Reader) {
    this.reader = reader;
    this.entries = new Map(Object.entries(this.entries));
    this.packageCache = new Map<string, UObject>();

    for (const entry of this.entries.values()) {
      entry.hash = Buffer.from((entry.hash as any).data);
    }
  }

  constructor(private reader: Reader) {}

  /**
   * Reads the file's info and index.
   */
  async initialize() {
    this.info = await this.loadInfo();
    await this.loadIndex();
    await this.loadHeaderSize();
  }

  /**
   * Reads the PakInfo struct from the end of the file
   *
   * @see https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Private/IPlatformFilePak.cpp#L4210-L4252
   */
  async loadInfo() {
    let version = LatestPakVersion;

    while (version > 0) {
      this.reader.seekTo(-FPakInfoSize(version));
      try {
        return await this.reader.read(FPakInfo(version));
      } catch (error) {
        console.warn(`Failed loading PakInfo version ${version}:`, error);
      }

      version -= 1;
    }

    throw new Error(`Malformed .pak trailer (did not match any known PakInfo version)`);
  }

  /** Loads the header size **/
  async loadHeaderSize() {
    if (this.info.version < 8) {
      this.headerSize = 53;
    } else {
      this.headerSize = 50;
    }
  }

  /**
   * Read the pak file's index, and load all PakEntries
   *
   * @see https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Private/IPlatformFilePak.cpp#L4254-L4356
   */
  async loadIndex() {
    const { indexOffset, indexSize, indexHash, version } = this.info;

    this.reader.seekTo(indexOffset);
    await this.reader.checkHash('index', indexSize, indexHash);

    this.mountPoint = await this.reader.read(UnrealString);

    const numEntries = await this.reader.read(UInt32);

    for (let i = 0; i < numEntries; i++) {
      const filename = await this.reader.read(UnrealString);

      const entry = await this.reader.read(FPakEntry(version));
      this.entries.set(filename, entry);
    }
  }

  /**
   * Asserts whether an inline PakEntry matches its index PakEntry.
   *
   * @see https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Private/IPlatformFilePak.cpp#L4042-L4066
   */
  checkEntries(context: string, indexEntry: Shape<typeof FPakEntry>, inlineEntry: Shape<typeof FPakEntry>) {
    if (indexEntry.size !== inlineEntry.size) {
      throw new Error(`${context} is corrupt: size mismatch ${indexEntry.size} vs ${inlineEntry.size}`);
    }

    if (indexEntry.uncompressedSize !== inlineEntry.uncompressedSize) {
      throw new Error(
        `${context} is corrupt: uncompressedSize mismatch ${indexEntry.uncompressedSize} vs ${inlineEntry.uncompressedSize}`,
      );
    }

    if (indexEntry.compressionMethodIndex !== inlineEntry.compressionMethodIndex) {
      throw new Error(
        `${context} is corrupt: compressionMethodIndex mismatch ${indexEntry.compressionMethodIndex} vs ${inlineEntry.compressionMethodIndex}`,
      );
    }

    if (indexEntry.hash.compare(inlineEntry.hash) !== 0) {
      throw new Error(`${context} is corrupt: hash mismatch`);
    }
  }
  
  /**
   * Look up a specific file within the pak.
   */
  async getPakFile(filename: string) {
    const entry = this.entries.get(filename);
    if (!entry) return null;

    // https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L1251-L1284
    const headerReader = new ChildReader(this.reader, entry.offset, Infinity);

    const {version} = this.info;

    const header = await headerReader.read(FPakEntry(version));

    this.checkEntries(filename, entry, header);

    const reader = new ChildReader(headerReader, headerReader.position, entry.size);
    // await reader.checkHash(filename, entry.size, entry.hash);

    return { filename, entry, reader };
  }
  
  private async getUAsset(filename: string, packageFile: any) {
    const assetFile = new UAsset(filename, packageFile.reader, packageFile.entry, this);
    await assetFile.initialize();
    return assetFile;
  }

  private async getPackageFile(filename: string) {
    if (!this.entries.get(filename)) {
      return null;
    }

    const packageFile = await this.getPakFile(filename);
    if (!packageFile) return null;

    return packageFile;
  }

  private async getPackage(path: string) {
    if (this.packageCache.has(path)) {
      return this.packageCache.get(path)!
    }

    const uexpPath = path + '.uexp';
    const uexpPackageFile = await this.getPackageFile(uexpPath);

    const uassetPath = path + '.uasset';
    const uassetPackageFile = await this.getPackageFile(uassetPath);

    if (!uexpPackageFile || !uassetPackageFile) {
      throw new Error("Cannot get package without a uexp or uasset file");
    }

    const uassetFile = await this.getUAsset(uassetPath, uassetPackageFile);

    const ubulkPath = path + '.ubulk';
    const ubulkPackageFile = await this.getPackageFile(ubulkPath);

    // UExp is just a collection of exports, which is why we would rather just roll that into the UObject.

    const uObjectFile = new UObject(this.info.version, uassetFile, uexpPackageFile.reader, ubulkPackageFile?.reader);
    await uObjectFile.initialize();

    this.packageCache.set(path, uObjectFile);

    return uObjectFile;
  }

  async getFiles(files: string[]) {
    const basicFileSet = new Set<string>();
    const uAssetFileSet = new Set<string>();

    for (const file of files) {
      if (!file.includes('.')) {
        uAssetFileSet.add(file);
        continue;
      }

      const splitFilename = file.split('.');
      const extension = splitFilename.pop();
      switch (extension) {
        case 'locmeta':
          break;
        case 'locres':
          basicFileSet.add(`${splitFilename.join('.')}.${extension}`);
          break;
        case 'udic':
          break;
        case 'bin':
          break;
        case 'uasset':
        case 'uexp':
        case 'ubulk':
          uAssetFileSet.add(splitFilename.join('.'));
          break;
        default:
          break;
      }
    }

    if (basicFileSet.size) {
      throw new Error("Unsupported files to get (basicFileSet)")
    }

    const numFilesToGet = uAssetFileSet.size;
    let i = 0;

    const allFiles = [];

    let progress = 0;

    for (const file of [...uAssetFileSet]) {
      // TODO: remove redundancy;
      if (this.packageCache.has(file)) {
        const packageDetails = await this.getPackage(file);
        allFiles.push(packageDetails);
        progress++;
      } else {
        process.stderr.write(
          `Processing: ${(Math.round((progress / numFilesToGet) * 10000) / 100).toFixed(2)}% (${progress}/${numFilesToGet}) ${file}\n`,
        );
        const packageDetails = await this.getPackage(file);
        allFiles.push(packageDetails);
        progress++;
      }
    }

    return allFiles;
  }
}