import {FName, NameMap} from "../FName";
import {Reader} from "../../../../readers/Reader";
import {UnrealString} from "../../../primitive/strings";

export function FSoftObjectPath(names: NameMap) {
  return async function FSoftObjectPathReader(reader: Reader) {
    return {
      assetPathName: await reader.read(FName(names)),
      subPathString: await reader.read(UnrealString),
    };
  };
}