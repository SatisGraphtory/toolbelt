import {FName, NameMap} from "../FName";
import {Reader} from "../../../../readers/Reader";
import {TArray} from "../../../containers/TArray";
import {FPackageIndex} from "../../file/FPackageIndex";
import {Shape} from "../../../../util/parsers";
import {FObjectImport} from "../../file/FObjectImport";
import {FObjectExport} from "../../file/FObjectExport";

export function FMulticastScriptDelegate(names: NameMap, imports: Shape<typeof FObjectImport>[],
                                         exports: Shape<typeof FObjectExport>[]) {
  return async function FMulticastScriptDelegateParser(reader: Reader) {
    return {
      invocationList: await reader.read(TArray(FScriptDelegate(names, imports, exports))),
    };
  };
}

export function FScriptDelegate(names: NameMap, imports: Shape<typeof FObjectImport>[],
                                exports: Shape<typeof FObjectExport>[]) {
  return async function FScriptDelegateParser(reader: Reader) {
    return {
      object: await reader.read(FPackageIndex(imports, exports)),
      functionName: await reader.read(FName(names)),
    };
  };
}