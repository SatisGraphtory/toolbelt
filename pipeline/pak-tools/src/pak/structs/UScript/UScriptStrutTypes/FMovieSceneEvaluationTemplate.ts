import {Reader} from "../../../../readers/Reader";
import {UInt32} from "../../../primitive/integers";

export async function FMovieSceneEvaluationTemplate(reader: Reader) {
  return {
    Value: await reader.read(UInt32),
  };
}
