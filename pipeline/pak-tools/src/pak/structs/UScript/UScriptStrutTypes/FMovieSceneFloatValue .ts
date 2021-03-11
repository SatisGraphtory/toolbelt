import {Float} from "../../../primitive/decimals";
import {Reader} from "../../../../readers/Reader";
import {Int8} from "../../../primitive/integers";

export async function FMovieSceneFloatValue(reader: Reader) {

  // Value:       parser.ReadFloat32(),
  //   InterpMode:  parser.Read(1)[0],
  //   TangentMode: parser.Read(1)[0],
  //   Tangent:     parser.ReadFMovieSceneTangentData(),


  return {
    Value: await reader.read(Float),
    InterpMode: await reader.read(Int8),
    TangentMode: await reader.read(Int8),
    Tangent: await reader.read(Int8),
  };
}
