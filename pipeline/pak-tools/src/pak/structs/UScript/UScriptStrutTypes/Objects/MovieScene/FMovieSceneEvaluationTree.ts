import {Reader} from "../../../../../../readers/Reader";
import {TEvaluationTreeEntryContainer} from "./TEvaluationTreeEntryContainer";
import {FMovieSceneEvaluationTreeNode} from "./FMovieSceneEvaluationTreeNode";

export async function FMovieSceneEvaluationTree (reader: Reader) {
  return {
    rootNode: await reader.read(FMovieSceneEvaluationTreeNode),
    childNodes: await reader.read(TEvaluationTreeEntryContainer(FMovieSceneEvaluationTreeNode)),
  };
}
