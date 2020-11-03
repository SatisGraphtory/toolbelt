import {Reader} from "../../../../readers/Reader";
import {Int8} from "../../../primitive/integers";

enum ERangeBoundType {
  RangeExclusive,
  RangeInclusive,
  RangeOpen,
}

export async function TRangeBound(reader: Reader) {
  return {
    BoundType: (await reader.read(Int8)) as ERangeBoundType,
  };
}
