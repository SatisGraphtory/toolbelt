import {FTexture2DMipMap} from "./FTexture2DMipMap";
import {Shape} from "../../../util/parsers";
import {Reader} from "../../../readers/Reader";
import {Int32, UInt32} from "../../primitive/integers";
import {FString} from "../../containers/FString";

export function FTexturePlatformData(ubulkReader: Reader | undefined, bulkOffset: number) {
  return async function FTexturePlatformDataParser(reader: Reader) {
    const sizeX = await reader.read(Int32);
    const sizeY = await reader.read(Int32);
    const numSlices = await reader.read(Int32);
    const pixelFormat = await reader.read(FString);
    const firstMip = await reader.read(Int32);
    const numMips = await reader.read(UInt32);
    const mips = [] as Shape<typeof FTexture2DMipMap>[];

    for (let i = 0; i < numMips; i++) {
      mips.push(await reader.read(FTexture2DMipMap(ubulkReader, bulkOffset)));
    }

    return {
      sizeX,
      sizeY,
      numSlices,
      pixelFormat,
      firstMip,
      mips,
      isVirtual: false
    };
  };
}