import {Reader} from "../../../../readers/Reader";
import {FName, NameMap} from "../FName";
import {UnrealString} from "../../../primitive/strings";

export function SoftObjectProperty(names: NameMap) {
  return async function SoftObjectPropertyParser(reader: Reader) {
    return {
      assetPathName: await reader.read(FName(names)),
      subPath: await reader.read(UnrealString),
    };
  };
}
