import {Shape} from "../../../util/parsers";
import {Reader} from "../../../readers/Reader";
import {UAsset} from "../UAsset";
import {PakVersion} from "../../PakFile";
import {Int32, Int64, UInt32} from "../../primitive/integers";
import {UExports} from "../UExports";
import {FTexturePlatformData} from "../../structs/texture/FTexturePlatformData";
import {FName} from "../../structs/UScript/FName";
import {FStripDataFlags} from "../../structs/texture/FStripDataFlags";
import {bigintToNumber} from "../../../util/numeric";
import {ImageExporter} from "../../exporter/imageExporter/ImageExporter";
import consoleInspect from "../../../util/consoleInspect";

export class UTexture2D extends UExports {
  cooked = 0;
  textures = [] as Shape<typeof FTexturePlatformData>[];

  constructor(
    reader: Reader,
    asset: UAsset,
    exportTypes: string,
    readGuid: boolean,
    pakVersion: PakVersion,
    private uBulkReader?: Reader
  ) {
    super(reader, asset, exportTypes, readGuid, pakVersion);
  }

  getImage() {

    let index = 0;
    let storedX = -Infinity;

    let bestIndex = 0;

    for (const texture of this.textures[0].mips) {
      if (texture.sizeX > storedX) {
        bestIndex = index;
        storedX = texture.sizeX;
      }
      index++;
    }

    return {
      x: this.textures[0].mips[bestIndex].sizeX,
      y: this.textures[0].mips[bestIndex].sizeY,
      data: ImageExporter.getImage(this.textures[0].mips[bestIndex], this.textures[0].pixelFormat),
    };
  }

  async initialize() {
    await super.initialize();

    const assetLength = this.asset.summary.totalHeaderSize;
    const exportSize = this.asset.exports.map(item => item.serialSize).reduce((a, b) => a + b, 0);

    // There's two because of byte padding?
    await this.reader.read(FStripDataFlags);
    await this.reader.read(FStripDataFlags);

    this.cooked = await this.reader.read(UInt32);

    if (this.cooked === 1) {
      let pixelFormat = await this.reader.read(FName(this.asset.names));
      while (pixelFormat !== 'None') {
        const skipOffset = await this.reader.read(Int64);
        const texture = await this.reader.read(
          FTexturePlatformData(this.uBulkReader, BigInt(assetLength) + BigInt(exportSize)),
        );

        // We need to use this to populate isVirtual in case it exists
        if (this.reader.position + BigInt(assetLength) + BigInt(4) === skipOffset) {
          texture.isVirtual = (await this.reader.read(Int32)) === 1;
        }

        if (this.reader.position + BigInt(assetLength) !== skipOffset) {
          throw new Error('Texture file read incorrectly');
        }

        this.textures.push(texture);

        pixelFormat = await this.reader.read(FName(this.asset.names));
      }
    }
  }
}