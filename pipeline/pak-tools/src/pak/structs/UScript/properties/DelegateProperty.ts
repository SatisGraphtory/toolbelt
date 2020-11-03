import {Int32} from "../../../primitive/integers";
import {FName, NameMap} from "../FName";
import {Reader} from "../../../../readers/Reader";

export function DelegateProperty(names: NameMap) {
  return async function DelegatePropertyParser(reader: Reader) {
    return {
      Object: await reader.read(Int32),
      Name: await reader.read(FName(names)),
    };
  };
}