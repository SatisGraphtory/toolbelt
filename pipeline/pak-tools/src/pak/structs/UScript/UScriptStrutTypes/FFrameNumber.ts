import {Float} from "../../../primitive/decimals";
import {Reader} from "../../../../readers/Reader";


export async function FFrameNumber(reader: Reader) {
  return {
    Value: await reader.read(Float),
  };
}
