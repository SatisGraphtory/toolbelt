import * as util from 'util';

import {PakVersion} from '../PakFile';

import {Reader} from "../../readers/Reader";
import {Int32, Int64, Int8, UInt32, UInt8} from "../primitive/integers";
import {FixedCString} from "../primitive/strings";
import {Shape} from "../../util/parsers";
import {FGuid, GuidSize} from "./UScript/UScriptStrutTypes/FGuid";
import {bigintToNumber} from "../../util/numeric";

// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L66-L67
const MAGIC_NUMBER = Buffer.from([0xe1, 0x12, 0x6f, 0x5a]).readUInt32LE(0);

// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L147-L228
export function FPakInfo(version: PakVersion) {
  return async function FPakInfoParser(reader: Reader) {
    let encryptionKeyGuid: Shape<typeof FGuid> | undefined;
    if (version >= PakVersion.EncryptionKeyGuid) {
      encryptionKeyGuid = await reader.read(FGuid);
    }

    const info = {
      encryptionKeyGuid,
      isEncryptedIndex: await reader.read(Int8),
      magic: await reader.read(UInt32),
      version: await reader.read(Int32),
      indexOffset: bigintToNumber(await reader.read(Int64)),
      indexSize: bigintToNumber(await reader.read(Int64)),
      indexHash: await reader.readBytes(20),
    };

    if (info.version >= PakVersion.FrozenIndex) {
      await reader.read(UInt8);
    }

    const compressionMethods = [] as (string | null)[];
    // https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L70-L73
    if (info.version >= PakVersion.FNameBasedCompressionMethod) {
      compressionMethods.push(await reader.read(FixedCString(32)));
      compressionMethods.push(await reader.read(FixedCString(32)));
      compressionMethods.push(await reader.read(FixedCString(32)));
      compressionMethods.push(await reader.read(FixedCString(32)));
      // TODO: Remove this once it's patched
      compressionMethods.push(await reader.read(FixedCString(32)));
    }

    if (info.magic !== MAGIC_NUMBER) {
      throw new Error(`Expected magic number to be ${MAGIC_NUMBER}, got ${util.format(info)}`);
    }

    if (info.version < 0 || info.version > version) {
      throw new Error(`Expected version to be within 0:${version}, but instead got ${info.version}`);
    }

    return {...info, compressionMethods};
  };
}

// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/PakFile/Public/IPlatformFilePak.h#L126-L138
export function FPakInfoSize(version: PakVersion) {
  let size =
    1 /* isEncryptedIndex */ +
    4 /* magic */ +
    4 /* version */ +
    8 /* indexOffset */ +
    8 /* indexSize */ +
    20 /* indexHash */;

  if (version >= PakVersion.EncryptionKeyGuid) size += GuidSize;
  if (version >= PakVersion.FNameBasedCompressionMethod) size += 32 * 4;
  if (version >= PakVersion.FrozenIndex) size += 1;
  if (version >= PakVersion.FrozenIndex) size += 32;

  return size;
}
