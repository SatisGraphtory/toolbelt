// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L392-L447
import {Reader} from "../../readers/Reader";
import {Int32, Int64, UInt32, UInt64, UInt8} from "../primitive/integers";
import {bigintToNumber} from "../../util/numeric";
import {TArray} from "../containers/TArray";
import {PakVersion} from "../PakFile";
import {Shape} from "../../util/parsers";



export function FPakEntryOld(version: PakVersion) {
  return async function FPakEntryReader(reader: Reader) {
    const offset = await reader.read(Int64);
    const size = await reader.read(Int64);
    const uncompressedSize = await reader.read(Int64);
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
      isEncrypted: await reader.read(UInt8),
      compressionBlockSize: await reader.read(UInt32),
      trash: version >= PakVersion.FrozenIndex ? await reader.readBytes(3) : 0
    };
  }
}
//
export async function FPakEntry(reader: Reader) {
  // // UE4 reference: FPakFile::DecodePakEntry()
  const bitfield = await reader.read(UInt32);

  let compressionBlockSize = 0;
  // flag value to load a field
  if ((bitfield & 0x3f) == 0x3f) {
    compressionBlockSize = await reader.read(UInt32);
  } else {
    // for backwards compatibility with old paks :
    compressionBlockSize = (bitfield & 0x3f) << 11;
  }

  const CompressionMethodIndex = ((bitfield >> 23) & 0x3f);

  // Filter out the CompressionMethod.
  //CompressionMethod = reader.Info.CompressionMethods[(int) ((bitfield >> 23) & 0x3f)];

  // Test for 32-bit safe values. Grab it, or memcpy the 64-bit value
  // to avoid alignment exceptions on platforms requiring 64-bit alignment
  // for 64-bit variables.
  //
  // // Read the Offset.

  let Offset = BigInt(0);

  const bIsOffset32BitSafe = (bitfield & (1 << 31)) !== 0;
  if (bIsOffset32BitSafe) {
    Offset = BigInt(await reader.read(UInt32));
  } else {
    Offset = await reader.read(UInt64)
  }

  // Read the UncompressedSize.
  const bIsUncompressedSize32BitSafe = (bitfield & (1 << 30)) !== 0;
  let UncompressedSize = BigInt(0);
  if (bIsUncompressedSize32BitSafe)
  {
    UncompressedSize = BigInt(await reader.read(UInt32));
  } else {
    UncompressedSize = await reader.read(UInt64);
  }

  const Size = UncompressedSize;

  let CompressedSize = BigInt(0);

  // Fill in the Size.
  if (CompressionMethodIndex !== 0)
  {
    const bIsSize32BitSafe = (bitfield & (1 << 29)) !== 0;
    if (bIsSize32BitSafe) {
      CompressedSize = BigInt(await reader.read(UInt32));
    }
    else {
      CompressedSize = await reader.read(UInt64);
    }
  } else {
    // The Size is the same thing as the UncompressedSize when
    // CompressionMethod == CompressionMethod.None.
    CompressedSize = UncompressedSize;
  }

  // // Filter the encrypted flag.
  const IsEncrypted = (bitfield & (1 << 22)) != 0;

  // This should clear out any excess CompressionBlocks that may be valid in the user's
  // passed in entry.
  const compressionBlocksCount = (bitfield >> 6) & 0xffff;
  const CompressionBlocks = [] as FPakCompressedBlock[];
  for (let i = 0; i < compressionBlocksCount; i++) {
    CompressionBlocks.push({
      compressedStart: BigInt(0),
      compressedEnd: BigInt(0),
      size: BigInt(0)
    });
  }

  let CompressionBlockSize = BigInt(0);
  if (compressionBlocksCount > 0) {
    CompressionBlockSize = BigInt(compressionBlockSize);
    // Per the comment in Encode, if compressionBlocksCount == 1, we use UncompressedSize for CompressionBlockSize
    if (compressionBlocksCount == 1) {
      CompressionBlockSize = UncompressedSize;
    }
  }

  // // Compute StructSize: each file still have FPakEntry data prepended, and it should be skipped.
  let StructSize = BigInt(8 * 3 + 4 * 2 + 1 + 20);
  // 8 is the long, 4 is the int

  // // Take into account CompressionBlocks
  if (CompressionMethodIndex !== 0) {
    StructSize += BigInt(4 + compressionBlocksCount * 2 * 8);
  }

  // Handle building of the CompressionBlocks array.
  if (compressionBlocksCount === 1 && !IsEncrypted) {
    // If the number of CompressionBlocks is 1, we didn't store any extra information.
    // Derive what we can from the entry's file offset and size.
    const b = CompressionBlocks[0];
    b.compressedStart = Offset + StructSize;
    b.compressedEnd = b.compressedStart + CompressedSize;
    b.size = CompressedSize;
  }  else if (compressionBlocksCount > 0) {
    // Get the right pointer to start copying the CompressionBlocks information from.

    // Alignment of the compressed blocks
    // https://github.com/FabianFG/CUE4Parse/blob/95997d33ce24fe37bf4abf58a7f2c6e96eb58186/CUE4Parse/Encryption/Aes/Aes.cs#L6
    // AES.Align is 16
    const compressedBlockAlignment = IsEncrypted ? 16 : 1;

    // compressedBlockOffset is the starting offset. Everything else can be derived from there.
    let compressedBlockOffset = Offset + StructSize;
    for (let compressionBlockIndex = 0; compressionBlockIndex < compressionBlocksCount; ++compressionBlockIndex)
    {
      const compressedBlock = CompressionBlocks[compressionBlockIndex];
      compressedBlock.compressedStart = compressedBlockOffset;
      compressedBlock.compressedEnd = compressedBlockOffset + BigInt(await reader.read(UInt32));
      compressedBlockOffset += Align(compressedBlock.compressedEnd - compressedBlock.compressedStart, compressedBlockAlignment);
    }
  }

  return {
    // Workaround for adding type
    type: null,
    offset: Offset,
    size: Size,
    compressedSize: CompressedSize,
    uncompressedSize: UncompressedSize,
    compressionMethodIndex: CompressionMethodIndex,
    isEncrypted: IsEncrypted,
    hash: new Buffer([]),
    compressionBlocks: CompressionBlocks,
    compressionBlockSize: compressionBlockSize,
    structSize: StructSize,
    isCompressed: UncompressedSize !== CompressedSize || CompressionMethodIndex !== 0
  };
}


const Align = (ptr: bigint, alignment: number) => {
  return ptr + BigInt(alignment) - BigInt(1) & ~(BigInt(alignment - 1));
}

export type FPakCompressedBlock = {
  compressedStart: bigint
  compressedEnd: bigint
  size?: bigint
}

// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L255-L274
export async function FPakCompressedBlock(reader: Reader): Promise<FPakCompressedBlock> {
  return {
    compressedStart: await reader.read(Int64),
    compressedEnd: await reader.read(Int64),
  };
}
