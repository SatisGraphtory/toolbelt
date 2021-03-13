import {Reader} from "../../../readers/Reader";
import {UnrealString} from "../../primitive/strings";
import {Int32} from "../../primitive/integers";

export async function FTextLocalizationResourceString(reader: Reader) {
  return {
    string: await reader.read(UnrealString),
    refCount: await reader.read(Int32),
  };
}