import {PakFile} from "../../pak/PakFile";
import {UObject} from "../../pak/pakfile/UObject";
import {produce} from 'immer';
import {inheritanceMap} from '../../../../../.DataLanding/interfaces'
import {findPossibleClasses, getJsonForObject, getJsonForObjectStrict} from "../loader/jsonLoader";
import exp from "constants";
import {resolveReferenceName} from "./resolveReferences";
import {sanitizeDependencies} from "./resolveDependencies";
import {UExports} from "../../pak/pakfile/UExports";
import {NameMap} from "../../pak/structs/UScript/FName";
import {WritableDraft} from "immer/dist/types/types-external";

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


function isStrictlyDefinedClass(cls: string) {
  //////// This section is to see if we can deprecate getJsonForObject ////////
  let isJSON = true;
  try {
    getJsonForObjectStrict(cls)
  } catch (e) {
    isJSON = false;
  }

  const isInInheritanceMap = (inheritanceMap as any)[cls] !== undefined

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


  const possibleTypes = findPossibleClasses(propertySet);

  if (possibleTypes.length === 1) {
    returnedType = possibleTypes[0];
    found = true;
  }

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

  if (!found && /^[A-Z]+_(.*)_C$/.test(exportType)) {
    // Hack to transform everything into a 'BP' type object, like 'BPD_'
    const newExportType = `BP_${exportType.match(/^[A-Z]+_(.+)_C$/)![1]}_C`;

    const prefixedExportType = resolveExportType(newExportType, names, propertySet)
    if (prefixedExportType !== newExportType) {
      returnedType = prefixedExportType;
      found = true
    }
  }

  // We have to manually resolve it now.
  // TODO: remove this dev whitelist when everything is sorted
  const dev_blacklist = new Set(['BlueprintGeneratedClass']);

  if (!found) {
    unresolvedExports.add(exportType)
    //TODO: Should we check named exports?
    // console.log("DFDSF");
    // for (const exportName of names) {
    //   console.log(exportName.name);
    //   if (isDefinedClass(exportName.name) && exportName.name.includes(exportType)) {
    //     returnedType = exportName.name;
    //     found = true;
    //     break;
    //   }
    // }
    //
    // if (!found) {
    //   throw new Error("Type needs manual resolution: " + exportType)
    // } else {
    //   // TODO: remove this along with above
    //   console.log(originalExport);
    //   throw new Error("We came in at " + exportType + " but ended up with " + returnedType)
    // }
  }

  if (exportType === 'ResearchTreeNode') {
    console.log(returnedType, found);
    throw new Error("DSFFSDFFSD");
  }

  return returnedType;
}

export async function resolveExports(pakFile: PakFile, baseObject: UObject, docObjects: Map<string, Map<string, any>>) {
  if (resolvedExportsCache.has(baseObject.uuid)) {
    return resolvedExportsCache.get(baseObject.uuid)!;
  }

  const propertyListsToMerge: any[] = [];

  const innerExportsByUuid: Map<String, any[]> = new Map();
  const definedClassInstanceUuids: Set<String> = new Set();

  const filename = baseObject.uasset.filename;
  const filteredExports = await produce(
    // Don't use BPGC
    baseObject.uexports.filter(exp => exp.exportTypes !== 'BlueprintGeneratedClass'),
    async function (draftState) {
      for (const originalExport of draftState) {

        const exportType = originalExport.exportTypes;

        const originalPropertySet = new Set(originalExport.propertyList.map(property => (property ? property.name : '')).filter(property => property));

        const resolvedExportType = resolveExportType(originalExport.exportTypes, originalExport.asset.names, originalPropertySet);


        // TODO: Delete this when investigation is finished
        const debugPropertyLists = new Set(['SceneComponent', 'StructProperty'])
        if (debugPropertyLists.has(resolvedExportType) && originalExport.propertyList.length) {
          console.log(originalExport.propertyList)
          throw new Error("Debug here for structProperty");
        }

        console.log(resolvedExportType, isStrictlyDefinedClass(resolvedExportType));
        // If We can't guess the type of export this is
        if (!isStrictlyDefinedClass(resolvedExportType)) {
          const referencedPakFile = resolveReferenceName(baseObject, exportType);

          console.log(referencedPakFile)

          const referencedFile = (
            await pakFile.getFiles([...sanitizeDependencies(pakFile, new Set([referencedPakFile]))])
          ).filter(item => {
            return item instanceof UObject;
          }) as UObject[];

          if (!referencedFile.length) {
            console.log("No file", referencedFile, referencedPakFile, [...sanitizeDependencies(pakFile, new Set([referencedPakFile]))]);
            const resolvedExportType = resolveExportType(originalExport.exportTypes, originalExport.asset.names, originalPropertySet);

            const originalType = originalExport.exportTypes;
            if (resolvedExportType !== null && resolvedExportType !== originalExport.exportTypes) {
              originalExport.exportTypes = resolvedExportType as string;
              console.log("Transformed", originalType, "into", originalExport.exportTypes)
            }
          } else {
            console.log("yes file");
            /// Debug step
            // TODO: Remove debug step
            unresolvedExports.delete(resolvedExportType);
            ///

            for (const exportFile of referencedFile) {
              const innerExports = (await resolveExports(pakFile, exportFile, docObjects)).filter(
                (exp: any) => exp.exportTypes !== 'BlueprintGeneratedClass'
              );

              if (innerExports.length === 0) {
                // Guessing time!
                const resolvedExportType = resolveExportType(originalExport.exportTypes, exportFile.uasset.names, originalPropertySet);
                originalExport.exportTypes = resolvedExportType as string;

                console.log(exportType, resolvedExportType)
                // TODO: delete this debug
                throw new Error("InnerExports debug error")
              } else {
                if (innerExports.length > 1) {
                  console.log(originalExport.exportTypes)
                  console.log(innerExports.map((item: any) => item.exportTypes));
                  throw new Error("More than one innerExport")
                }

                const innerExport = innerExports[0]!;

                propertyListsToMerge.push(innerExports);
                definedClassInstanceUuids.add(originalExport.uuid);
                innerExportsByUuid.set(originalExport.uuid, innerExports);
                // // Swaparoo
                originalExport.exportTypes = innerExport.exportTypes;
              }
            }
          }

          if (resolvedExportType === 'Build_ConveyorBeltMk1_C') throw new Error("DDDDDDD");
        }
      }
    }
  );

  let finalExportList = [] as any[];

  // Gets all properties
  const subProperties = [...[...definedClassInstanceUuids].map(exportUuid => innerExportsByUuid.get(exportUuid))] as unknown as UExports[];

  const subPropertyCountMap = new Map<string, any[]>();
  const allExportTypes = new Set();

  // if (subProperties.length) {
  //   // console.log(subProperties);
  //   throw new Error("ddfdsfsfsdfsdfs");
  // }

  subProperties.forEach(item => {
    const exportType = item.exportTypes;
    allExportTypes.add(exportType);

    if (!subPropertyCountMap.has(exportType)) {
      subPropertyCountMap.set(exportType, []);
    }
    subPropertyCountMap.get(item.exportTypes)!.push(item);
  })
//
//   const subPropertyCountMap = new Map<string, any[]>();
//
//   const allExportTypes = new Set();
//
//   subProperties.forEach(item => {
//     const exportType = item.exportTypes;
//     allExportTypes.add(exportType);
//
//     if (!subPropertyCountMap.has(exportType)) {
//       subPropertyCountMap.set(exportType, []);
//     }
//     subPropertyCountMap.get(item.exportTypes)!.push(item);
//   })
//
//   const outerPropertyCountMap = new Map<string, any[]>();
//
//   filteredExports.forEach(item => {
//     const exportType = item.exportTypes;
//     allExportTypes.add(exportType);
//     if (!outerPropertyCountMap.has(exportType)) {
//       outerPropertyCountMap.set(exportType, []);
//     }
//     outerPropertyCountMap.get(item.exportTypes)!.push(item);
//   })
//
//   const processedOuterExportUuids = new Set<string>();
//
//   // Merge all subproperties
//   for (const item of subProperties) {
//     const overwritingPropertyLength = outerPropertyCountMap.get(item.exportTypes)?.length;
//
//     const innerGuids = findGuids(item);
//
//     //TODO: Refactor the duplication. Hard to figure out where the actual changes were.
//     if (!overwritingPropertyLength) {
//       // Easy, just put the subproperty in the final array!
//       finalExportList.push(item);
//     } else {
//       if (overwritingPropertyLength === 1) {
//         const outerExport = outerPropertyCountMap.get(item.exportTypes)![0];
//
//         const outerGuids = findGuids(outerExport);
//
//         const intersection = new Set(
//           [...innerGuids].filter(x => outerGuids.has(x)));
//
//         if (innerGuids.size && !intersection.size) {
//           if (innerGuids.size === 1) {
//             // They're not related. Don't push, but this is a hack.
//             finalExportList.push(item);
//           } else {
//             console.log(innerGuids, outerGuids);
//             console.log(item.propertyList.map((item: any) => item.name));
//             console.log(outerExport.propertyList.map((item: any) => item.name));
//             throw new Error("Unimplemented property replacement: 1")
//           }
//         } else {
//           // Just replace the first, and then delete the overwriting from the array
//           const doctoredExport = await mergeExports(item, outerExport)
//
//           finalExportList.push(doctoredExport);
//
//           const outerPropertyArray = outerPropertyCountMap.get(item.exportTypes)!;
//           const spliceIndex = outerPropertyArray.indexOf(outerExport);
//           if (spliceIndex === -1) {
//             throw new Error("Index should not be negative");
//           }
//
//           processedOuterExportUuids.add(outerExport.uuid);
//
//           outerPropertyArray.splice(spliceIndex, 1);
//         }
//       } else {
//
//         if (!innerGuids.size) {
//           const outerExport = outerPropertyCountMap.get(item.exportTypes)![0];
//
//           // Just replace the first, and then delete the overwriting from the array
//           const doctoredExport = await mergeExports(item, outerExport)
//
//           finalExportList.push(doctoredExport);
//
//           const outerPropertyArray = outerPropertyCountMap.get(item.exportTypes)!;
//           const spliceIndex = outerPropertyArray.indexOf(outerExport);
//           if (spliceIndex === -1) {
//             throw new Error("Index should not be negative");
//           }
//
//           processedOuterExportUuids.add(outerExport.uuid);
//
//           outerPropertyArray.splice(spliceIndex, 1);
//         } else {
//           const outerExports = outerPropertyCountMap.get(item.exportTypes)!;
//
//           let foundExport = false;
//           let outerExport: any;
//           for (const possibleOuterExport of outerExports) {
//             const intersection = new Set(
//               [...innerGuids].filter(x => findGuids(possibleOuterExport).has(x)));
//             if (intersection.size) {
//               foundExport = true;
//               outerExport = possibleOuterExport;
//               break;
//             }
//           }
//
//           if (!foundExport) {
//             finalExportList.push(item);
//           } else {
//             // Just replace the first, and then delete the overwriting from the array
//             const doctoredExport = await mergeExports(item, outerExport)
//
//             finalExportList.push(doctoredExport);
//
//             const outerPropertyArray = outerPropertyCountMap.get(item.exportTypes)!;
//             const spliceIndex = outerPropertyArray.indexOf(outerExport);
//             if (spliceIndex === -1) {
//               throw new Error("Index should not be negative");
//             }
//
//             processedOuterExportUuids.add(outerExport.uuid);
//
//             outerPropertyArray.splice(spliceIndex, 1);
//           }
//         }
//       }
//     }
//   }
//
//   filteredExports.forEach(item => {
//     if (processedOuterExportUuids.has(item.uuid)) {
//       return;
//     }
//
//     finalExportList.push(item);
//   })
//


  resolvedExportsCache.set(baseObject.uuid, filteredExports);
  return filteredExports;
}
