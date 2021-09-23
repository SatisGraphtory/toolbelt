// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L76-L92
import {Shape} from "../util/parsers";
import {FPakInfo, FPakInfoSize} from "./structs/FPakInfo";
import {FPakEntry, FPakEntryOld} from "./structs/FPakEntry";
import {Reader} from "../readers/Reader";
import {UnrealString} from "./primitive/strings";
import {ByteBoolean, Int32, Int64, Int8, UInt32, UInt64} from "./primitive/integers";
import {ChildReader} from "../readers/ChildReader";
import {UAsset} from "./pakfile/UAsset";
import {UObject} from "./pakfile/UObject";
import {ULocalizationResource} from "./pakfile/ULocalizationResource";
import util from "util";
import {FGuid} from "./structs/UScript/UScriptStrutTypes/FGuid";
import {bigintToNumber} from "../util/numeric";
import {TArray} from "./containers/TArray";
import {FString} from "./containers/FString";

export enum PakVersion {
  Initial = 1,
  NoTimestamps = 2,
  CompressionEncryption = 3,
  IndexEncryption = 4,
  RelativeChunkOffsets = 5,
  DeleteRecords = 6,
  EncryptionKeyGuid = 7,
  FNameBasedCompressionMethod = 8,
  FrozenIndex = 9,
  PathHashIndex = 10,
  FNV64BugFix = 11
}

export const LatestPakVersion = PakVersion.FNV64BugFix;

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

  // public optimizeLoadFromFile(reader: Reader) {
  //   this.reader = reader;
  //   this.entries = new Map(Object.entries(this.entries));
  //   this.packageCache = new Map<string, UObject>();
  //
  //   for (const entry of this.entries.values()) {
  //     entry.hash = Buffer.from((entry.hash as any).data);
  //   }
  // }

  constructor(private reader: Reader) {
  }

  /**
   * Reads the file's info and index.
   */
  async initialize() {
    this.info = await this.loadInfo();
    await this.loadIndex(this.info.version);
    await this.loadHeaderSize();
  }

  /**
   * Reads the PakInfo struct from the end of the file
   *
   * @see https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Private/IPlatformFilePak.cpp#L4210-L4252
   */
  async loadInfo() {
    let version = LatestPakVersion;

    // Uncomment this if you need to find the offset
    // await this.debugFindOffset(version);

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

  private async debugFindOffset(version: PakVersion.FNV64BugFix) {
    // https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L66-L67
    const MAGIC_NUMBER = Buffer.from([0xe1, 0x12, 0x6f, 0x5a]).readUInt32LE(0);

    let offset = -44;
    while (true) {
      this.reader.seekTo(offset);

      let encryptionKeyGuid = null;
      if (version >= PakVersion.EncryptionKeyGuid) {
        encryptionKeyGuid = await this.reader.read(FGuid);
      }

      const info = {
        encryptionKeyGuid,
        isEncryptedIndex: await this.reader.read(Int8),
        magic: await this.reader.read(UInt32),
        version: await this.reader.read(Int32),
      };

      if (info.magic === MAGIC_NUMBER) {
        console.log("Needed to seek to offset", offset, info);
        // break;
      } else {
        // console.log("not found", offset)
      }

      offset--;

      if (offset < -1024) {
        throw new Error("Could not find magic bytes")
      }
    }

    console.log(-FPakInfoSize(version));
    throw new Error("DONE");
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
  async loadIndex(pakVersion: PakVersion) {
    return await this.loadIndexUpdated(pakVersion);
    // const {indexOffset, indexSize, indexHash, version} = this.info;
    //
    // this.reader.seekTo(indexOffset);
    // await this.reader.checkHash('index', indexSize, indexHash);
    //
    // this.mountPoint = await this.reader.read(UnrealString);
    //
    // const numEntries = await this.reader.read(UInt32);
    //
    // for (let i = 0; i < numEntries; i++) {
    //   const filename = await this.reader.read(UnrealString);
    //
    //   const entry = await this.reader.read(FPakEntry(version));
    //   this.entries.set(filename, entry);
    //
    //   if (pakVersion >= PakVersion.FrozenIndex) {
    //     await this.reader.readBytes(3);
    //   }
    // }
  }

  async loadIndexUpdated(pakVersion: PakVersion) {
    const {indexOffset, indexSize, indexHash, version} = this.info;
    // https://github.com/FabianFG/CUE4Parse/blob/bfc93e19dbd0e421cb08b90dce3241382f5cc7c5/CUE4Parse/UE4/Pak/PakFileReader.cs#L147
    this.reader.seekTo(indexOffset);
    await this.reader.checkHash('index', indexSize, indexHash);

    this.mountPoint = await this.reader.read(UnrealString);

    const numEntries = await this.reader.read(UInt32);

    const pathHashSeed = await this.reader.read(UInt64);

    let bReaderHasPathHashIndex = false;
    let PathHashIndexOffset = BigInt(-1);
    let PathHashIndexSize = BigInt(0);
    let PathHashIndexHash = null;

    bReaderHasPathHashIndex = await this.reader.read(Int32) !== 0;

    if (bReaderHasPathHashIndex)
    {
      PathHashIndexOffset = await this.reader.read(Int64);
      PathHashIndexSize = await this.reader.read(Int64);
      PathHashIndexHash = await this.reader.readBytes(20);
      bReaderHasPathHashIndex = bReaderHasPathHashIndex && PathHashIndexOffset !== BigInt(-1);
    }


    let bReaderHasFullDirectoryIndex = false;
    let FullDirectoryIndexOffset =BigInt(-1);
    let FullDirectoryIndexSize = BigInt(0);
    let FullDirectoryIndexHash = null;
    bReaderHasFullDirectoryIndex = await this.reader.read(Int32) !== 0;
    if (bReaderHasFullDirectoryIndex)
    {
      FullDirectoryIndexOffset = await this.reader.read(Int64);
      FullDirectoryIndexSize = await this.reader.read(Int64);
      FullDirectoryIndexHash = await this.reader.readBytes(20);
      bReaderHasFullDirectoryIndex = bReaderHasFullDirectoryIndex && FullDirectoryIndexOffset !== BigInt(-1);
    }



    const encodedPakEntriesSize = await this.reader.read(Int32);

    const encodedPakEntriesReader = new ChildReader(this.reader, this.reader.position, encodedPakEntriesSize);

    this.reader.seekTo(this.reader.position + BigInt(encodedPakEntriesSize));

    const filesNum = await this.reader.read(Int32);
    if (filesNum < 0) {
      throw new Error("Invalid fileNums size!");
    }

    if (filesNum > 0) {
      throw new Error("Unimplemented");
      // FPakEntry[] Files = new FPakEntry[FilesNum]; // from what i can see, there aren't any???
      // if (FilesNum > 0)
      // {
      //   for (int FileIndex = 0; FileIndex < FilesNum; ++FileIndex)
      //   {
      //     Files[FileIndex] = new FPakEntry(reader, Info.Version);
      //   }
      // }
    }

    let bWillUseFullDirectoryIndex = false;
    let bWillUsePathHashIndex = false;
    let bReadFullDirectoryIndex = false;
    if (bReaderHasPathHashIndex && bReaderHasFullDirectoryIndex) {
      bWillUseFullDirectoryIndex = false; // https://github.com/EpicGames/UnrealEngine/blob/79a64829237ae339118bb50b61d84e4599c14e8a/Engine/Source/Runtime/PakFile/Private/IPlatformFilePak.cpp#L5628
      bWillUsePathHashIndex = !bWillUseFullDirectoryIndex;
      let bWantToReadFullDirectoryIndex = false;
      bReadFullDirectoryIndex = bReaderHasFullDirectoryIndex && bWantToReadFullDirectoryIndex;
    } else if (bReaderHasPathHashIndex) {
      bWillUsePathHashIndex = true;
      bWillUseFullDirectoryIndex = false;
      bReadFullDirectoryIndex = false;
    } else if (bReaderHasFullDirectoryIndex) {
      // We don't support creating the PathHash Index at runtime;
      // we want to move to having only the PathHashIndex,
      // so supporting not having it at all is not useful enough to write
      bWillUsePathHashIndex = false;
      bWillUseFullDirectoryIndex = true;
      bReadFullDirectoryIndex = true;
    } else {
      // It should not be possible for PrimaryIndexes to be built without a PathHashIndex AND without a FullDirectoryIndex; CreatePakFile in UnrealPak.exe has a check statement for it.
      throw new Error("Corrupt pak PrimaryIndex detected!");
    }

    // // Load the Secondary Index(es)
    let PathHashIndexReader = null as unknown as Reader;
    let PathHashIndex = new Map<bigint, number>();
    let bHasPathHashIndex = false;
    if (bWillUsePathHashIndex) {
      if (PathHashIndexOffset < 0 || BigInt(this.reader.getSize()) < (PathHashIndexOffset + PathHashIndexSize)) {
        // Should not be possible for these values (which came from the PrimaryIndex) to be invalid, since we verified the index hash of the PrimaryIndex
        throw new Error("Corrupt pak PrimaryIndex detected!");
      }
      this.reader.seekTo(bigintToNumber(PathHashIndexOffset));

      PathHashIndexReader = new ChildReader(this.reader, this.reader.position, bigintToNumber(PathHashIndexSize));

      const ReadPathHashIndex = async (reader: Reader) => {
        const ret = new Map<bigint, number>();

        async function KeyValuePair(reader: Reader) {
          return {
            k: await reader.read(UInt64),
            v: await reader.read(Int32),
          };
        }
        const entries = await reader.read(TArray(KeyValuePair));
        for (const {k, v} of entries) {
          ret.set(k, v);
        }

        return ret;
      }

      PathHashIndex = await ReadPathHashIndex(PathHashIndexReader);
      bHasPathHashIndex = true;
    }

    let DirectoryIndex = new Map<string, Map<string, number>>();
    let bHasFullDirectoryIndex = false;
    if (!bReadFullDirectoryIndex) {
      DirectoryIndex = await this.readDirectoryIndex(PathHashIndexReader);

      for (const [dirname, dir] of DirectoryIndex.entries()) {
        for (const [filename, pakLocation] of dir.entries()) {
          const path = dirname + filename;
          encodedPakEntriesReader.seekTo(pakLocation);
          console.log("Loading pak file", path);
          const entry = await encodedPakEntriesReader.read(FPakEntry);
          this.entries.set(path, entry);
        }
      }

      bHasFullDirectoryIndex = false;
    }

    if (DirectoryIndex.size !== 0 || !bHasFullDirectoryIndex) {
      if (BigInt(this.reader.getSize()) < (FullDirectoryIndexOffset + FullDirectoryIndexSize) ||
        FullDirectoryIndexOffset < 0) {
        // Should not be possible for these values (which came from the PrimaryIndex) to be invalid, since we verified the index hash of the PrimaryIndex
        throw new Error("Corrupt pak PrimaryIndex detected!");

      }
      const SecondaryIndexReader = new ChildReader(this.reader, bigintToNumber(FullDirectoryIndexOffset), bigintToNumber(FullDirectoryIndexSize));
      DirectoryIndex = await this.readDirectoryIndex(SecondaryIndexReader);
      bHasFullDirectoryIndex = true;

      for (const [dirname, dir] of DirectoryIndex.entries()) {
        for (const [filename, pakLocation] of dir.entries()) {
          const path = dirname + filename;
          encodedPakEntriesReader.seekTo(pakLocation);
          console.log("Loading pak file", path);
          const entry = await encodedPakEntriesReader.read(FPakEntry);
          this.entries.set(path, entry);
        }
      }
    }
  }

  private async readDirectoryIndex(reader: Reader) {
    const ret = new Map<string, Map<string, number>>();

    const KeyValuePair = async (reader: Reader) => {

      return {
        k: await reader.read(FString),
        v: await this.readFPakDirectory(reader)
      };
    }

    const entries = await reader.read(TArray(KeyValuePair));
    for (const {k, v} of entries) {
      ret.set(k, v);
    }

    return ret;
  }

  private async readFPakDirectory(reader: Reader) {
    const ret = new Map<string, number>();
    async function KeyValuePair(reader: Reader) {
      return {
        k: await reader.read(FString),
        v: await reader.read(Int32),
      };
    }
    const entries = await reader.read(TArray(KeyValuePair));
    for (const {k, v} of entries) {
      ret.set(k, v);
    }

    return ret;
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

    // if (indexEntry.hash.compare(inlineEntry.hash) !== 0) {
    //   throw new Error(`${context} is corrupt: hash mismatch`);
    // }
  }

  /**
   * Look up a specific file within the pak.
   */
  async getPakFile(filename: string) {
    const entry = this.entries.get(filename);
    if (!entry) return null;

    // https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L1251-L1284
    const headerReader = new ChildReader(this.reader, entry.offset, entry.size);

    const {version} = this.info;

    const header = await headerReader.read(FPakEntryOld(version)) as unknown as any;

    this.checkEntries(filename, entry, header as any);

    const reader = new ChildReader(headerReader, headerReader.position, entry.size);

    return {filename, entry, reader};
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

  public async getLocalizationFile(path: string) {
    const localizationResource = await this.getPackageFile(path);
    if (!localizationResource) throw new Error("Could not find localization resource " + path)
    const uObjectFile = new ULocalizationResource(this.info.version, localizationResource.reader, localizationResource.entry, path);
    await uObjectFile.initialize();
    return uObjectFile.getDictionary();
  }

  public async getExportType(path: string) {
    if (path.endsWith('.uasset')) {
      const uassetPackageFile = await this.getPackageFile(path);
      const uassetFile = await this.getUAsset(path, uassetPackageFile);
      const exports = [] as string[];
      for (const exp of uassetFile.exports) {
        exports.push(exp.objectName);
      }

      return {
        path: path,
        exports
      }
    } else {
      return null;
    }
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

    // Errors here
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
        progress++;
        process.stderr.write(
          `Processing: ${(Math.round((progress / numFilesToGet) * 10000) / 100).toFixed(2)}% (${progress}/${numFilesToGet}) ${file}\n`,
        );
        const packageDetails = await this.getPackage(file);
        allFiles.push(packageDetails);
      }
    }

    return allFiles;
  }
}