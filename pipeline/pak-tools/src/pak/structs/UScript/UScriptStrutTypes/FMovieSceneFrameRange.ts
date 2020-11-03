import { TRange } from './TRange';
import {Reader} from "../../../../readers/Reader";

export async function FMovieSceneFrameRange(reader: Reader) {
  return {
    Value: await reader.read(TRange),
  };
}
