import {Reader} from "../../../../readers/Reader";
import {Int8} from "../../../primitive/integers";

enum ERangeBoundType {
  RangeExclusive,
  RangeInclusive,
  RangeOpen,
}

export function  TRangeBound(readSize: number) {
  return async function TRangeBoundReader(reader: Reader) {
    const boundType = (await reader.read(Int8)) as ERangeBoundType;

    return {
      BoundType: boundType,
      Value: await reader.readBytes(readSize)
    };
  }
}
