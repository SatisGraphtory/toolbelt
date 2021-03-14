import {PakFile} from "../../pak/PakFile";
import {Marshaller} from "./marshaller";
import {UObject} from "../../pak/pakfile/UObject";
import {findAdditionalClasses, findMainClass, resolveExports} from "../resolvers/resolveExports";
import {resolveSlugFromPath} from "../resolvers/resolveSlugs";
import {getJsonForObject} from "../loader/jsonLoader";
import consoleInspect from "../../util/consoleInspect";
import {guessSubclassesFromJsonClassName} from "../steps/json/guessSubclassesFromJsonClassName";

const objectCache = new Map<string, any>();
const loadedNonMainClasses = new Map<string, boolean>();

async function marshallObject<T>(pakFile: PakFile, uObject: UObject,
                              docEntry: Record<string, Record<string, any>>,
                              uObjectMarshaller: Marshaller,
                              baseClass: string, loadNonMainClasses: boolean,
                                 mainClassToFind: string ) {
  // if (objectCache.get(uObject.uasset.filename)) {
  //   if (loadNonMainClasses && loadedNonMainClasses.get(uObject.uasset.filename)) {
  //     return objectCache.get(uObject.uasset.filename)
  //   } else if (!loadNonMainClasses) {
  //     return objectCache.get(uObject.uasset.filename)
  //   }
  // }

  const resolvedExports = await resolveExports(pakFile, uObject);

  const mainClass = await findMainClass(resolvedExports);

  const returnedObjects = [] as any[];

  if (mainClass?.exportTypes === mainClassToFind) {
    const toReturn =  {
      type: mainClass.exportTypes,
      filename: uObject.uasset.filename,
      slug: await resolveSlugFromPath(uObject.uasset.filename, pakFile),
      object: await uObjectMarshaller.marshalFromPropertyList<T>(
        mainClass.propertyList, baseClass, docEntry, true)
    };
    returnedObjects.push(toReturn);
  }

  if (loadNonMainClasses) {
    const additionalClasses = await findAdditionalClasses(resolvedExports);
    for (const claz of additionalClasses || []) {
      if (claz.exportTypes === mainClassToFind) {
        const subClassInfo = await uObjectMarshaller.marshalFromPropertyList<T>(
          claz.propertyList, baseClass, docEntry, true);

        const additionalClassInfo = {
          type: claz.exportTypes,
          name: uObject.uasset.filename,
          slug: await resolveSlugFromPath(uObject.uasset.filename, pakFile),
          object: subClassInfo
        };
        returnedObjects.push(additionalClassInfo);
      }
    }
  }

  return {
    mainClassType: mainClass?.exportTypes,
    objects: returnedObjects
  };
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

export async function marshallSubclassGeneric<T>(pakFile: PakFile, pakFiles: Set<string>,
                                                 docObject: Record<string, Record<string, Record<string, any>>>,
                                                 unrealClassNameInput: string,
                                                 searchNonMainClasses = false,
                                                 limitToProvidedDocs = false) {

  const uObjectEntries = await pakFile.getFiles([...pakFiles])

  const classes = new Set(guessSubclassesFromJsonClassName(unrealClassNameInput));

  const objectMap = new Map<string, T[]>();
  const slugToFileMap = new Map<string, string>();
  const slugToClassMap = new Map<string, string>();
  const classMap = new Map<string, Set<string>>();

  const allDependencies = new Set<string>();

  for (const unrealClassName of classes) {
    const docObjectClass = unrealClassName.startsWith('A')
      ? unrealClassName.replace(/^A/, '')
      : unrealClassName.replace(/^U/, '')

    const genericMarshaller = new Marshaller(pakFile);

    const providedObjects = docObjectClass ? docObject[docObjectClass] : {};

    const objectList = [] as T[];

    for (const objectEntry of uObjectEntries) {
      const name = objectEntry.uasset.filename.match(/^.*\/([A-Za-z_0-9\-]+)\.uasset/)![1];
      const correspondingDocsEntry = findActualObjectName(providedObjects, name + "_C")|| {};

      if (limitToProvidedDocs && Object.keys(correspondingDocsEntry).length === 0) {
        continue;
      }

      const marshalledObjects = await marshallObject<T>(
        pakFile, objectEntry,
        correspondingDocsEntry,
        genericMarshaller, unrealClassName, searchNonMainClasses, docObjectClass);

      for (const obj of marshalledObjects.objects) {
        if (!objectMap.get(obj.slug)) {
          objectMap.set(obj.slug, []);
          slugToFileMap.set(obj.slug, obj.filename)
        }

        objectMap.get(obj.slug)!.push(obj.object);
        objectList.push(obj.object);

        if (marshalledObjects.mainClassType) {
          slugToClassMap.set(obj.slug, marshalledObjects.mainClassType)
          if (!classMap.get(marshalledObjects.mainClassType)) {
            classMap.set(marshalledObjects.mainClassType, new Set<string>());
          }
          classMap.get(marshalledObjects.mainClassType)!.add(obj.slug);
        }
      }
    }

    genericMarshaller.determineAndAddMissingDependencies(objectList)

    for (const foundDependency of genericMarshaller.getDependencies().filter((dep) => {
      return !pakFiles.has(dep);
    })) {
      allDependencies.add(foundDependency)
    }
  }

  return {
    objectMap,
    slugToFileMap,
    slugToClassMap,
    classToFilenameMap: classMap,
    dependencies: [...allDependencies]
  }
}