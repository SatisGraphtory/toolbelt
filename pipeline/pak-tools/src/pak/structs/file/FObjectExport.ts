// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/CoreUObject/Private/UObject/ObjectResource.cpp#L107-L172
import {FName, NameMap} from "../UScript/FName";
import {Reader} from "../../../readers/Reader";
import {Int32, Int64, UEBoolean, UInt32} from "../../primitive/integers";
import {bigintToNumber} from "../../../util/numeric";
import {FGuid} from "../UScript/UScriptStrutTypes/FGuid";
import {Shape} from "../../../util/parsers";
import {FObjectImport} from "./FObjectImport";
import {FPackageIndex} from "./FPackageIndex";

export function FObjectExportFromExports(index: number,  imports: Shape<typeof FObjectImport>[], exports: Shape<typeof FObjectExport>[]) {
  return async function FObjectExportParser(reader: Reader) {
    const exportMapEntry = exports[index];

    return {
      outerIndex: await reader.read(FPackageIndex(imports, exports, exportMapEntry.outerIndex)),
      objectFlags: exportMapEntry.objectFlags,
      serialOffset: exportMapEntry.serialOffset,
      serialSize: exportMapEntry.serialSize,
      packageFlags: exportMapEntry.packageFlags,
      objectName: exportMapEntry.objectName
    };
  };
}

export function FObjectExport(names: NameMap) {
  return async function FObjectExportParser(reader: Reader) {
    return {
      classIndex: await reader.read(Int32),
      superIndex: await reader.read(Int32),
      templateIndex: await reader.read(Int32),
      outerIndex: await reader.read(Int32),
      objectName: await reader.read(FName(names)),
      objectFlags: await reader.read(UInt32),
      serialSize: bigintToNumber(await reader.read(Int64)),
      serialOffset: bigintToNumber(await reader.read(Int64)),
      isForcedExport: await reader.read(UEBoolean),
      isNotForClient: await reader.read(UEBoolean),
      isNotForServer: await reader.read(UEBoolean),
      packageGuid: await reader.read(FGuid),
      packageFlags: await reader.read(UInt32),
      isNotAlwaysLoadedForEditorGame: await reader.read(UEBoolean),
      isAsset: await reader.read(UEBoolean),
      firstExportDependency: await reader.read(Int32),
      serializationBeforeSerializationDependencies: await reader.read(Int32),
      createBeforeSerializationDependencies: await reader.read(Int32),
      serializationBeforeCreateDependencies: await reader.read(Int32),
      createBeforeCreateDependencies: await reader.read(Int32),
    };
  };
}
