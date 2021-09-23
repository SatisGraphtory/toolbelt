import {FTexture2DMipMap} from "./FTexture2DMipMap";
import {Shape} from "../../../util/parsers";
import {Reader} from "../../../readers/Reader";
import {Int32, UInt32} from "../../primitive/integers";
import {FString} from "../../containers/FString";

const hasOptData = 1 << 30;

export function FTexturePlatformData(ubulkReader: Reader | undefined, bulkOffset: bigint) {
  return async function FTexturePlatformDataParser(reader: Reader) {
    const sizeX = await reader.read(Int32);
    const sizeY = await reader.read(Int32);
    const packedData = await reader.read(Int32);
    const pixelFormat = await reader.read(FString);

    if (packedData & hasOptData) {
      // https://github.com/EpicGames/UnrealEngine/blob/c3caf7b6bf12ae4c8e09b606f10a09776b4d1f38/Engine/Source/Runtime/Engine/Classes/Engine/Texture.h#L426
      // Never used
    }

    const firstMip = await reader.read(Int32);
    const numMips = await reader.read(UInt32);
    const mips = [] as Shape<typeof FTexture2DMipMap>[];

    for (let i = 0; i < numMips; i++) {
      mips.push(await reader.read(FTexture2DMipMap(ubulkReader, bulkOffset)));
    }

    return {
      sizeX,
      sizeY,
      packedData,
      pixelFormat,
      firstMip,
      mips,
      isVirtual: false
    };
  };
}