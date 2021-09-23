import {Reader} from "../../../../../../readers/Reader";
import {Int32} from "../../../../../primitive/integers";

export async function FEvaluationTreeEntryHandle(reader: Reader) {
  return {
    entryIndex: await reader.read(Int32)
  };
}
