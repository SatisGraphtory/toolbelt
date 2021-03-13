import {Reader} from "../../../readers/Reader";
import {UInt32} from "../../primitive/integers";
import {UnrealString} from "../../primitive/strings";

export async function FTextKey(reader: Reader) {
  return {
    stringHash: await reader.read(UInt32),
    string: await reader.read(UnrealString),
  };
}