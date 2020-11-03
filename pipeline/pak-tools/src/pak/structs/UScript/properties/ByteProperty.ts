import {Reader} from "../../../../readers/Reader";
import {FName, NameMap} from "../FName";
import {UInt8} from "../../../primitive/integers";

export function BytePropertyTagMetaData(names: NameMap) {
  return async function BytePropertyParser(reader: Reader) {
    return await reader.read(FName(names));
  };
}

export async function ByteProperty(reader: Reader) {
  // We'll treat a byte as an unsigned 8 bit number for now.
  return await reader.read(UInt8);
}
