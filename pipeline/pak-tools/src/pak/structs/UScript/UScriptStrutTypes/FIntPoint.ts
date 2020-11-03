// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/Core/Public/Math/IntPoint.h#L16
import {Int32} from "../../../primitive/integers";
import {Reader} from "../../../../readers/Reader";

export async function FIntPoint(reader: Reader) {
  return {
    x: await reader.read(Int32),
    y: await reader.read(Int32),
  };
}
