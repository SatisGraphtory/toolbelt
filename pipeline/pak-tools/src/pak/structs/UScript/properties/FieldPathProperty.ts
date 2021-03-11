import {Reader} from "../../../../readers/Reader";
import {NameMap} from "../FName";

import {FFieldPath} from "./FFieldPath";

export function FieldPathProperty(nameMap: NameMap) {
  return async function FieldPathPropertyReader(reader: Reader) {

    return {
      Value: await reader.read(FFieldPath(nameMap))
    }
  }
}
