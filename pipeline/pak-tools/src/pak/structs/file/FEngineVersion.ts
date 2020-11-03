// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/Core/Private/Misc/EngineVersion.cpp#L214-L222
import {Reader} from "../../../readers/Reader";
import {UInt16, UInt32} from "../../primitive/integers";
import {UnrealString} from "../../primitive/strings";

export async function FEngineVersion(reader: Reader) {
  return {
    major: await reader.read(UInt16),
    minor: await reader.read(UInt16),
    patch: await reader.read(UInt16),
    changelist: await reader.read(UInt32),
    branch: await reader.read(UnrealString),
  };
}
