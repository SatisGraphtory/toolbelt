import {Reader} from "../../../../../../readers/Reader";
import {Int32} from "../../../../../primitive/integers";
import {FEvaluationTreeEntryHandle} from "./FEvaluationTreeEntryHandle";
import {TRange} from "../../TRange";

export async function FMovieSceneEvaluationTreeNodeHandle(reader: Reader) {
  return {
    childrenHandle: await reader.read(FEvaluationTreeEntryHandle),
    index: await reader.read(Int32)
  };
}
