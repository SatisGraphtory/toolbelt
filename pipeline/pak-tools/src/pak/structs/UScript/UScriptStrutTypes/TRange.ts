import { TRangeBound } from './TRangeBound';
import {Reader} from "../../../../readers/Reader";

export async function TRange(reader: Reader) {
  return {
    LowerBound: await reader.read(TRangeBound),
    UpperBound: await reader.read(TRangeBound),
  };
}
