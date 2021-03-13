import {Reader} from "../../../readers/Reader";
import {UnrealString} from "../../primitive/strings";
import {UInt32} from "../../primitive/integers";

export async function FEntry(reader: Reader) {
  return {
    localizedString: await reader.read(UnrealString),
    sourceStringHash: await reader.read(UInt32),
  };
}