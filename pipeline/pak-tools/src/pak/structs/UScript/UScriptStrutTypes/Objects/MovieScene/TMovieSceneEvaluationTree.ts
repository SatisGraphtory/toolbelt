import {Parser} from "../../../../../../util/parsers";
import {Reader} from "../../../../../../readers/Reader";
import {TArray} from "../../../../../containers/TArray";
import {Int32} from "../../../../../primitive/integers";

export function TMovieSceneEvaluationTree<TShape>(parser: Parser<TShape>) {
  return async function TMovieSceneEvaluationTreeParser(reader: Reader) {
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