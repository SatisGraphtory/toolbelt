import {TRangeBound} from './TRangeBound';
import {Reader} from "../../../../readers/Reader";

export function TRange(readSize: number) {
  return async function TRangeReader(reader: Reader) {
    return {
      LowerBound: await reader.read(TRangeBound(readSize)),
      UpperBound: await reader.read(TRangeBound(readSize)),
    };
  }
}
