import {Reader} from "../../../../readers/Reader";
import {Int64} from "../../../primitive/integers";

export async function FDateTime(reader: Reader) {
  return {
    Ticks: await reader.read(Int64),
  };
}
