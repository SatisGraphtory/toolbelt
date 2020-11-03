import {Float} from "../../../primitive/decimals";
import {Reader} from "../../../../readers/Reader";
import {UInt8} from "../../../primitive/integers";

export async function FPerPlatformFloat(reader: Reader) {
  // !== 0 for bCooked
  await reader.read(UInt8);

  return await reader.read(Float);
}
