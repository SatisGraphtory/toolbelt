import {UInt8} from "../../../primitive/integers";
import {Reader} from "../../../../readers/Reader";
import {FVector} from "./FVector";

export async function FBox(reader: Reader) {
  return {
    Min: await reader.read(FVector),
    Max: await reader.read(FVector),
    bIsValid: (await reader.read(UInt8)) !== 0,
  };
}
