import {Reader} from "../../../../../../../readers/Reader";
import {Int32} from "../../../../../../primitive/integers";
import {TMovieSceneEvaluationTree} from "../TMovieSceneEvaluationTree";

export async function FMovieSceneEvaluationFieldEntityTree(reader: Reader) {
  return {
    serializedData: await reader.read(TMovieSceneEvaluationTree(FEntityAndMetaDataIndex))
  };
}


export async function FEntityAndMetaDataIndex(reader: Reader) {
  return {
    entityIndex: await reader.read(Int32),
    metaDataIndex: await reader.read(Int32),
  };
}