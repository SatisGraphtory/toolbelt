import {Reader} from "../../../../../../readers/Reader";
import {TRange} from "../../TRange";
import {FMovieSceneEvaluationTreeNodeHandle} from "./FMovieSceneEvaluationTreeNodeHandle ";
import {FEvaluationTreeEntryHandle} from "./FEvaluationTreeEntryHandle";

export async function FMovieSceneEvaluationTreeNode(reader: Reader) {
  return {
    range: await reader.read(TRange(4)),
    parent: await reader.read(FMovieSceneEvaluationTreeNodeHandle),
    childrenId: await reader.read(FEvaluationTreeEntryHandle),
    dataId: await reader.read(FEvaluationTreeEntryHandle),
  };
}