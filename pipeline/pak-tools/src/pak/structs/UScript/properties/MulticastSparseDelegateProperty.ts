import {NameMap} from "../FName";
import {Reader} from "../../../../readers/Reader";
import {Shape} from "../../../../util/parsers";
import {FObjectImport} from "../../file/FObjectImport";
import {FObjectExport} from "../../file/FObjectExport";
import {FMulticastScriptDelegate, FScriptDelegate} from "./ScriptDelegates";

export function MulticastDelegateProperty(names: NameMap, imports: Shape<typeof FObjectImport>[],
                                          exports: Shape<typeof FObjectExport>[], size: number) {
  return async function MulticastDelegatePropertyParser(reader: Reader) {
    if (size === 0) {
      return {
        invocationList: [] as Shape<typeof FScriptDelegate>[]
      }
    } else {
      return await reader.read(FMulticastScriptDelegate(names, imports, exports))
    }
  }
}

export const MulticastSparseDelegateProperty = MulticastDelegateProperty;
