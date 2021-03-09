// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L392-L447
import {Reader} from "../../readers/Reader";
import {Int64, UInt32, UInt8} from "../primitive/integers";
import {bigintToNumber} from "../../util/numeric";
import {TArray} from "../containers/TArray";
import {PakVersion} from "../PakFile";

export function FPakEntry(version: PakVersion) {
  return async function FPakEntryReader(reader: Reader) {
    const offset = bigintToNumber(await reader.read(Int64));
    const size = bigintToNumber(await reader.read(Int64));
    const uncompressedSize = bigintToNumber(await reader.read(Int64));
    const compressionMethod = await reader.read(UInt8);
    const hash = await reader.readBytes(20);

    let compressionBlocks = [] as { compressedStart: bigint; compressedEnd: bigint }[];
    if (compressionMethod > 0) {
      compressionBlocks = await reader.read(TArray(FPakCompressedBlock));
    }

    return {
      // Workaround for adding type
      type: null,
      offset,
      size,
      uncompressedSize,
      compressionMethodIndex: compressionMethod,
      hash,
      compressionBlocks,
      flags: await reader.read(UInt8),
      compressionBlockSize: await reader.read(UInt32),
      trash: version >= PakVersion.FrozenIndex ? await reader.readBytes(3) : 0
    };
  }
}

// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L255-L274
export async function FPakCompressedBlock(reader: Reader) {
  return {
    compressedStart: await reader.read(Int64),
    compressedEnd: await reader.read(Int64),
  };
}
