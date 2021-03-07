import {PakFile} from "../../pak/PakFile";
import {UObject} from "../../pak/pakfile/UObject";
import {produce} from 'immer';
import {inheritanceMap} from '../../../../../.DataLanding/interfaces'
import {findPossibleClasses, getJsonForObject} from "../loader/jsonLoader";
import {resolveReferenceName} from "./resolveReferences";
import {dependencyExists, sanitizeDependencies} from "./resolveDependencies";
import {NameMap} from "../../pak/structs/UScript/FName";
import {resolvePropertyListMerges} from "./resolvePropertyListMerges";
import util from "util";
import {UExports} from "../../pak/pakfile/UExports";

function isDefinedClass(cls: string) {
  //////// This section is to see if we can deprecate getJsonForObject ////////
  let isJSON = true;
  try {
    getJsonForObject(cls)
  } catch (e) {
    isJSON = false;
  }

  const isInInheritanceMap = [cls, `U${cls}`, `A${cls}`].some((clsName: string) => (inheritanceMap as any)[clsName] !== undefined);

  // Doesn't work if it isn't inherited. TODO: Experiment if we can just solely rely on isJSON
  // if (isInInheritanceMap !== isJSON) {
  //   throw new Error(`Mismatch response for isJson for ${cls}, isJSON: ${isJSON}, inheritanceMap: ${isInInheritanceMap}` );
  // }

  return isInInheritanceMap || isJSON;
}

const resolvedExportsCache = new Map<string, any>();

export const unresolvedExports = new Set();

function resolveExportType(exportType: string, names: NameMap, propertySet: Set<string>) {
  let returnedType: string = exportType;

  let found = false;

  // TODO: check pak files to make sure that the export type isn't already exported direclty

  // TODO: a list of native export types that include things like StructProperty.

  const uFGName = exportType.replace(/^BP_/g, 'UFG').replace(/_C$/g, '');
  if (!found && isDefinedClass(uFGName)) {
    returnedType = uFGName;
    found = true
  }

  const FGName = exportType.replace(/^BP_/g, 'FG').replace(/_C$/g, '');
  if (!found && isDefinedClass(FGName)) {
    returnedType = FGName;
    found = true
  }

  // TODO: Might be redundant
  const secondUFGName = exportType.replace(/^FG/g, 'UFG').replace(/_C$/g, '');
  if (!found && isDefinedClass(secondUFGName)) {
    returnedType = secondUFGName;
    found = true
  }

  if (!found && /^[A-Z]+_(.*)_C$/.test(exportType)) {
    const match = exportType.match(/^([A-Z]+)_(.+)_C$/)!
    if (match[1] !== 'BP') {

      // Hack to transform everything into a 'BP' type object, like 'BPD_'
      const newExportType = `BP_${match[2]}_C`;
      const {resolvedType: prefixedExportType, found: wasFound} = resolveExportType(newExportType, names, propertySet)
      if (wasFound) {
        returnedType = prefixedExportType;
        found = true
      }
    }
  }

  if (!found) {
    // Use brute force;
    const possibleTypes = findPossibleClasses(propertySet);

    if (possibleTypes.length === 1) {
      returnedType = possibleTypes[0];
      found = true;
    }
  }

  if (!found) {
    unresolvedExports.add(exportType)
  }

  return {resolvedType: returnedType, found};
}

export async function findMainClass(exports: UExports[]) {
  if (!exports.length) return null;
  // We don't want to filter
  const exportTypes = exports.map((item: any) => item.exportTypes);
  // The actual instances comes after the BlueprintGeneratedClass.
  const index = exportTypes.indexOf('BlueprintGeneratedClass');
  if (index + 1 < exportTypes.length && index >= 0) {
    return exports[index + 1]
  }

  return exports[0];
}

// https://github.com/EpicGames/UnrealEngine/blob/f8f4b403eb682ffc055613c7caf9d2ba5df7f319/Engine/Source/Runtime/Engine/Private/BlueprintGeneratedClass.cpp#L612
// https://github.com/EpicGames/UnrealEngine/blob/f8f4b403eb682ffc055613c7caf9d2ba5df7f319/Engine/Source/Runtime/Engine/Private/BlueprintGeneratedClass.cpp#L415
export async function resolveExports(pakFile: PakFile, baseObject: UObject, depth = 0) {
  if (resolvedExportsCache.has(baseObject.uuid)) {
    return resolvedExportsCache.get(baseObject.uuid)!;
  }

  let numInnerExports = 0;
  const propertiesToMerge: any[] = [];

  const filteredExports = await produce(
    // Don't use BPGC?     // .filter(exp => exp.exportTypes !== 'BlueprintGeneratedClass'),
    baseObject.uexports,
    async function (draftState) {
      let currentIndex = 0;
      while(currentIndex < draftState.length) {
        const originalExport = draftState[currentIndex];
        currentIndex++;

        const exportType = originalExport.exportTypes;

        // originally !isStrictlyDefinedClass(resolvedExportType), which means if it WAS an instance like Build_conveyer
        // and not FGComponentConnection
        // But now we just check if a file with the name of this exists
        if (dependencyExists(pakFile, exportType)) {

          const originalPropertySet = new Set(originalExport.propertyList.map(property => (property ? property.name : '')).filter(property => property));

          const {resolvedType: resolvedExportType, found: typeWasFound} = resolveExportType(originalExport.exportTypes, originalExport.asset.names, originalPropertySet);

          const referencedPakFile = resolveReferenceName(baseObject, exportType, pakFile);

          const referencedFileList = (
            await pakFile.getFiles([...sanitizeDependencies(pakFile, new Set([referencedPakFile]))])
          ).filter(item => {
            return item instanceof UObject;
          }) as UObject[];

          if (!referencedFileList.length) {
            if (!referencedPakFile.startsWith('/Script/')) {
              console.warn("No file found for", referencedPakFile, " and export set to", originalExport.exportTypes);
            }

            if (resolvedExportType !== null && typeWasFound) {
              originalExport.exportTypes = resolvedExportType as string;
              console.log("Transformed", exportType, "into", originalExport.exportTypes)
            }
            throw new Error("WHAT");
          } else {
            numInnerExports++;

            const exportFile = referencedFileList[0];

            // TODO: Remove debug step
            unresolvedExports.delete(resolvedExportType);

            const innerExports = await resolveExports(pakFile, exportFile, depth + 1);

            if (innerExports.length === 0) {

              console.log(exportType, resolvedExportType)
              // TODO: delete this
              throw new Error("InnerExports had no exports!")
            }

            // We don't want to filter
            const innerExportTypes = innerExports.map((item: any) => item.exportTypes);
            // The actual instances comes after the BlueprintGeneratedClass.
            const instanceIndex = innerExportTypes.indexOf('BlueprintGeneratedClass');

            if (instanceIndex === -1) {
              console.log(exportType, innerExportTypes)
              // Everything should have BPG?
              throw new Error("Should have BGC")
            } else {
              if ((instanceIndex + 1) >= innerExports.length) {
                console.log(innerExports)
                throw new Error("Too many umports, no bgc")
              }

              const mainInnerProperty = innerExports[instanceIndex + 1]!;

              // Merge the main property now, and the other properties rn?

              const combinedPropertyList = await resolvePropertyListMerges(mainInnerProperty.propertyList, originalExport.propertyList)

              originalExport.exportTypes = mainInnerProperty.exportTypes;
              originalExport.propertyList = combinedPropertyList;

              const innerOtherProperties = innerExports.slice(instanceIndex + 2);
              propertiesToMerge.push([currentIndex, innerOtherProperties])

              // To be honest I have no idea how to resolve these blueprint type things, especially since
              // the properties overlap.
              // I tried looking at the docs but they use some kind of default object we don't necessarily have access to
              // So we're going to do the lazy thing and just gather ALL of the other inner properties, and then resolve them at the end.
              // Hope this is OK.
            }
          }
        }
      }

      for (const [indexToStart, propertyListToMerge] of propertiesToMerge) {
        const modifiedProperties = new Set<string>();
        for (const property of propertyListToMerge) {
          const propertyType = property.exportTypes;
          let foundProperty = false;
          for (let i = indexToStart; i < draftState.length; i++) {
            const draftStateExport = draftState[i];
            if (modifiedProperties.has(draftStateExport.uuid)) continue;
            if (draftStateExport.exportTypes === propertyType) {
              foundProperty = true;
              console.log("Merging property:", propertyType)
              modifiedProperties.add(draftStateExport.uuid)
              draftStateExport.propertyList = await resolvePropertyListMerges(property.propertyList, draftStateExport.propertyList);
              break;
            }
          }

          if (!foundProperty) {
            draftState.push(property);
          }
        }
      }
    }
  );

  // console.log(util.inspect(filteredExports.map((exp) => {
  //   return {
  //     name: exp.exportTypes,
  //     props: exp.propertyList
  //   }
  // }), false, null, true ) )

  resolvedExportsCache.set(baseObject.uuid, filteredExports);
  return filteredExports;
}
