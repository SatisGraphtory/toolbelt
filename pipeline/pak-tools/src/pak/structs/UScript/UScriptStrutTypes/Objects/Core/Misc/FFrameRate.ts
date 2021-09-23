import {Reader} from "../../../../../../../readers/Reader";
import {Int32} from "../../../../../../primitive/integers";

export async function FFrameRate(reader: Reader) {
  return {
    numerator: await reader.read(Int32),
    denominator: await reader.read(Int32),
  };
}