import {UInt32} from "../../../primitive/integers";
import {Reader} from "../../../../readers/Reader";

export async function InterfaceProperty(reader: Reader) {
  return {
    Value: await reader.read(UInt32),
  };
}
