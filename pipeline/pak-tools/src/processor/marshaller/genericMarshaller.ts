import {PakFile} from "../../pak/PakFile";
import {Marshaller} from "./marshaller";
import {UObject} from "../../pak/pakfile/UObject";
import {findAdditionalClasses, findMainClass, resolveExports} from "../resolvers/resolveExports";
import {resolveSlugFromPath} from "../resolvers/resolveSlugs";
import {getJsonForObject} from "../loader/jsonLoader";
import consoleInspect from "../../util/consoleInspect";

const objectCache = new Map<string, any>();
const loadedNonMainClasses = new Map<string, boolean>();

async function marshallObject<T>(pakFile: PakFile, uObject: UObject,
                              docEntry: Record<string, Record<string, any>>,
                              uObjectMarshaller: Marshaller,
                              baseClass: string, loadNonMainClasses: boolean) {
  if (objectCache.get(uObject.uasset.filename)) {
    if (loadNonMainClasses && loadedNonMainClasses.get(uObject.uasset.filename)) {
      return objectCache.get(uObject.uasset.filename)
    } else if (!loadNonMainClasses) {
      return objectCache.get(uObject.uasset.filename)
    }
  }

  const resolvedExports = await resolveExports(pakFile, uObject);

  const mainClass = await findMainClass(resolvedExports);

  const additionalObjects = [] as any[];

  if (loadNonMainClasses) {
    loadedNonMainClasses.set(uObject.uasset.filename, true);
    const additionalClasses = await findAdditionalClasses(resolvedExports);

    if (additionalClasses) {
      for (const claz of additionalClasses) {
        additionalObjects.push(await uObjectMarshaller.marshalFromPropertyList<T>(
          claz.propertyList, baseClass, docEntry, true))
      }
    }
  }

  if (mainClass) {
    const toReturn =  {
      type: mainClass.exportTypes,
      name: uObject.uasset.filename,
      slug: await resolveSlugFromPath(uObject.uasset.filename, pakFile),
      object: await uObjectMarshaller.marshalFromPropertyList<T>(
        mainClass.propertyList, baseClass, docEntry, true),
      additionalObjects
    };

    objectCache.set(uObject.uasset.filename, toReturn);

    return toReturn;
  } else {
    throw new Error("Could not find main class for object file " + uObject.uasset.filename)
  }
}

function findActualObjectName(docObject: any, keyToSearch: string) {
  if (!docObject) return null;

  for (const key of Object.keys(docObject)) {
    if (key.toLowerCase() === keyToSearch.toLowerCase()) {
      return docObject[key]
    }
  }

  return null;
}

export async function marshallGeneric<T>(pakFile: PakFile, pakFiles: Set<string>,
                                      docObject: Record<string, Record<string, Record<string, any>>>,
                                         docObjectClass: string | null, unrealClassName: string,
                                         searchNonMainClasses = false,
                                         limitToProvidedDocs = false) {

  const genericMarshaller = new Marshaller(pakFile);

  // Only use UObjects that aren't UTexture2D.
  const uObjectEntries = await pakFile.getFiles([...pakFiles]);

  const providedObjects = docObjectClass ? docObject[docObjectClass] : {};

  const objectList = [] as T[];

  const objectMap = new Map<string, T[]>();
  const slugMap = new Map<string, string>();

  const requiredAttributes = new Set(getJsonForObject(unrealClassName).required);

  for (const objectEntry of uObjectEntries) {
    const name = objectEntry.uasset.filename.match(/^.*\/([A-Za-z_0-9\-]+)\.uasset/)![1];
    const correspondingDocsEntry = findActualObjectName(providedObjects, name + "_C")|| {};

    if (limitToProvidedDocs && Object.keys(correspondingDocsEntry).length === 0) {
      continue;
    }

    const marshalledObject = await marshallObject<T>(
      pakFile, objectEntry,
      correspondingDocsEntry,
      genericMarshaller, unrealClassName, searchNonMainClasses);

    // const marshalledAttributeSet = Object.keys(marshalledObject.object).filter(item => item.startsWith('m'));

    if (marshalledObject.type === docObjectClass) {
      if (!objectMap.get(marshalledObject.name)) {
        objectMap.set(marshalledObject.name, []);
        slugMap.set(marshalledObject.name, marshalledObject.slug)
      }
      objectMap.get(marshalledObject.name)!.push(marshalledObject.object);

      objectList.push(marshalledObject.object);
    } else if (searchNonMainClasses) {
      for (const additionalExport of marshalledObject.additionalObjects) {
        if (additionalExport.type === docObjectClass) {
          if (!objectMap.get(marshalledObject.name)) {
            objectMap.set(marshalledObject.name, []);
            slugMap.set(marshalledObject.name, marshalledObject.slug)
          }
          objectMap.get(marshalledObject.name)!.push(additionalExport);

          objectList.push(additionalExport);
        }
      }
    }


    // for (const entry of Object.keys(correspondingDocsEntry)) {
    //   requiredAttributes.add(entry);
    // }
    //
    // // for (const attr of marshalledAttributeSet) {
    // //   if (!requiredAttributes.has(attr)) {
    // //     console.log("Missing", attr)
    // //     consoleInspect(marshalledObject)
    // //   }
    // // }
    // if (marshalledAttributeSet.every((item: string) => requiredAttributes.has(item))) {
    //
    //   if (!objectMap.get(marshalledObject.name)) {
    //     objectMap.set(marshalledObject.name, []);
    //     slugMap.set(marshalledObject.name, marshalledObject.slug)
    //   }
    //   objectMap.get(marshalledObject.name)!.push(marshalledObject.object);
    //
    //   objectList.push(marshalledObject.object);
    // } else {
    //   if (searchNonMainClasses) {
    //     for (const additionalExport of marshalledObject.additionalObjects) {
    //       const marshalledSubAttributeSet = Object.keys(additionalExport).filter(item => item.startsWith('m'));
    //       if (marshalledSubAttributeSet.every((item: string) => requiredAttributes.has(item))) {
    //         if (!objectMap.get(marshalledObject.name)) {
    //           objectMap.set(marshalledObject.name, []);
    //           slugMap.set(marshalledObject.name, marshalledObject.slug)
    //         }
    //         objectMap.get(marshalledObject.name)!.push(additionalExport);
    //
    //         objectList.push(additionalExport);
    //       }
    //     }
    //   }
    // }
    //

  }

  genericMarshaller.determineAndAddMissingDependencies<T>(objectList);

  return {
    objectMap,
    slugMap,
    dependencies: genericMarshaller.getDependencies().filter((dep) => {
      return !pakFiles.has(dep);
    })
  }
}