import {FText} from "./FText";
import {Double, Float} from "../../../primitive/decimals";
import {Int32, Int64, UInt32, UInt64, UInt8} from "../../../primitive/integers";
import {Reader} from "../../../../readers/Reader";
import {NameMap} from "../FName";
import {FString} from "../../../containers/FString";
import {EFormatArgumentType} from "./FFormatArgumentValue";


enum ETextGender {
  Masculine,
  Feminine,
  Neuter,
  // Add new enum types at the end only! They are serialized by index.
}

export function FFormatArgumentData(names: NameMap) {
  return async function FFormatArgumentData(reader: Reader) {
    const ArgumentName = await reader.read(FString);
    const ArgumentValueType = await reader.read(UInt8) as EFormatArgumentType;
    let ArgumentValue;

    switch (ArgumentValueType) {
      case EFormatArgumentType.Text:
        ArgumentValue = await reader.read(FText(names));
        break;
      case EFormatArgumentType.Int:
        ArgumentValue = await reader.read(Int32);
        break;
      case EFormatArgumentType.Float:
        ArgumentValue = await reader.read(Float);
        break;
      case EFormatArgumentType.Gender:
        ArgumentValue = await reader.read(UInt8) as ETextGender;
        break;
      default:
        throw new Error('Unimplemented FFormatArgumentValue type: ' + ArgumentValueType);
    }

    return {
      ArgumentName,
      ArgumentValueType,
      ArgumentValue
    }
  };
}
