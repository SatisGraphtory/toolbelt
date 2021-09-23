import {Reader} from "../../../../../../readers/Reader";
import {Parser} from "../../../../../../util/parsers";
import {TArray} from "../../../../../containers/TArray";
import {Int32} from "../../../../../primitive/integers";

export function TEvaluationTreeEntryContainer<TShape>(parser: Parser<TShape>) {
  return async function TEvaluationTreeEntryContainerParser(reader: Reader) {
    return {
      entries: await reader.read(TArray(FEntry)),
      items: await reader.read(TArray(parser))
    }
  }
}

async function FEntry(reader: Reader) {
  return {
    startIndex: await reader.read(Int32),
    size: await reader.read(Int32),
    capacity: await reader.read(Int32)
  };
}