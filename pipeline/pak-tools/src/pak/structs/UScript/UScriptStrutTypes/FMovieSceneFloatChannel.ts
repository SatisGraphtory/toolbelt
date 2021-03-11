import {Reader} from "../../../../readers/Reader";
import {Int32, UInt32, UInt8} from "../../../primitive/integers";
import {UAsset} from "../../../pakfile/UAsset";
import {FPackageIndex} from "../../file/FPackageIndex";
import {FName} from "../FName";
import {Float} from "../../../primitive/decimals";

export enum ERichCurveExtrapolation {
  /** Repeat the curve without an offset. */
  RCCE_Cycle,
  /** Repeat the curve with an offset relative to the first or last key's value. */
  RCCE_CycleWithOffset,
  /** Sinusoidally extrapolate. */
  RCCE_Oscillate,
  /** Use a linearly increasing value for extrapolation.*/
  RCCE_Linear,
  /** Use a constant value for extrapolation */
  RCCE_Constant,
  /** No Extrapolation */
  RCCE_None,
}

export async function FMovieSceneFloatChannel(reader: Reader) {
  return {
    PreInfinityExtrap: await reader.read(UInt8) as ERichCurveExtrapolation,
    PostInfinityExtrap: await reader.read(UInt8) as ERichCurveExtrapolation
  }
}

