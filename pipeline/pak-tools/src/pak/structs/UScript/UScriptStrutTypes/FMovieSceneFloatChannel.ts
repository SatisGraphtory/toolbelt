import {Reader} from "../../../../readers/Reader";
import {Int32, UEBoolean, UInt8} from "../../../primitive/integers";
import {FFrameNumber} from "./FFrameNumber";
import {Shape} from "../../../../util/parsers";
import {TArray} from "../../../containers/TArray";
import {FMovieSceneFloatValue} from "./FMovieSceneFloatValue ";
import {Float} from "../../../primitive/decimals";
import {FFrameRate} from "./Objects/Core/Misc/FFrameRate";

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
  const preInfinityExtrap = await reader.read(UInt8) as ERichCurveExtrapolation;
  const postInfinityExtrap = await reader.read(UInt8) as ERichCurveExtrapolation;

  let CurrentSerializedElementSize = 4; // Unsafe.SizeOf<FFrameNumber>();
  let SerializedElementSize = await reader.read(Int32);

  let times = [] as Shape<typeof FFrameNumber>[]


  if (SerializedElementSize == CurrentSerializedElementSize) {
    times = await reader.read(TArray(FFrameNumber));
  } else {
    const ArrayNum = await reader.read(Int32)

    if (ArrayNum > 0) {
      const padding = SerializedElementSize - CurrentSerializedElementSize;

      for (let i = 0; i < ArrayNum; i++) {
        await reader.skip(padding);
        times.push(await reader.read(FFrameNumber))
        //Ar.Position += padding; TODO check this
      }
    }
  }

  let values = [] as Shape<typeof FMovieSceneFloatValue>[];

  CurrentSerializedElementSize = 7; // Unsafe.SizeOf<FMovieSceneFloatValue>();
  SerializedElementSize = await reader.read(Int32);

  if (SerializedElementSize == CurrentSerializedElementSize) {
    values = await reader.read(TArray(FMovieSceneFloatValue));
  } else {
    const ArrayNum = await reader.read(Int32);

    if (ArrayNum > 0) {
      const padding = SerializedElementSize - CurrentSerializedElementSize;

      for (let i = 0; i < ArrayNum; i++) {
        await reader.skip(padding);
        times.push(await reader.read(FMovieSceneFloatValue))
        //Ar.Position += padding; TODO check this
      }
    }
  }

  const defaultValue = await reader.read(Float);
  const bHasDefaultValue = await reader.read(UEBoolean);
  const tickResolution = await reader.read(FFrameRate);
  // const bShowCurve = await reader.read(UEBoolean); // maybe later.

  return {
    preInfinityExtrap,
    postInfinityExtrap,
    times,
    values,
    defaultValue,
    bHasDefaultValue,
    tickResolution,
    // bShowCurve
  }
}


