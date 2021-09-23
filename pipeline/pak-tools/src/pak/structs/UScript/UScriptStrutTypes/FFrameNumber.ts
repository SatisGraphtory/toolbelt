import {Reader} from "../../../../readers/Reader";
import {Int32} from "../../../primitive/integers";


export async function FFrameNumber(reader: Reader) {
  return {
    Value: await reader.read(Int32),
  };
}
