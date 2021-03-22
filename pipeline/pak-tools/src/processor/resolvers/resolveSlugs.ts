import {packageReference} from "../../../../headers-to-interfaces/emit/native/references";
import {PakFile} from "../../pak/PakFile";
import {guessUnrealSubclassesFromJsonClassName} from "../steps/json/guessSubclassesFromJsonClassName";
import {findMainClass, resolveExports} from "./resolveExports";

export function getPackageAndFilenameFromPath(fullPath: string) {
  const pathParsed = fullPath.split('/');
  const fileNameRaw = pathParsed.pop()!;
  const pathMain = pathParsed.join('/');

  let fileName = fileNameRaw;

  if (fileName.indexOf('.') !== -1) {
    const fileNameList = fileNameRaw.split('.');
    fileNameList.pop();
    fileName = fileNameList.join('.')
  }
  return {pathMain, fileName};
}

export async function resolveSlugFromPath(fullPath: string, pakFile: PakFile) {
  let {pathMain, fileName} = getPackageAndFilenameFromPath(fullPath);

  let slug = await resolveSlugFromPackageReference({
    package: pathMain,
    name: fileName,
    slug: ''
  }, pakFile, true);

  if (slug === undefined) {
    throw new Error("Could not make slug from " + fullPath);
  }

  return slug;
}

const schematicClasses = new Set(guessUnrealSubclassesFromJsonClassName('UFGSchematic'));
const recipeClasses = new Set(guessUnrealSubclassesFromJsonClassName('UFGRecipe'));
const itemClasses = new Set(guessUnrealSubclassesFromJsonClassName('UFGItemDescriptor'));
const buildingClasses = new Set(guessUnrealSubclassesFromJsonClassName('AFGBuildable'));

const packagePathCache = new Map<string, any>()

export async function resolveSlugFromPackageReference(packageReference: packageReference<any>,
                                                      pakFile: PakFile,
                                                      createBackupSlug = true) {
  const {name, package: packagePath} = packageReference;
  const keyToFind = name + '::::' + packagePath + '::::' + createBackupSlug;
  if (!packagePathCache.has(keyToFind)) {
    const returnValue = await resolveSlugFromPackageReferenceImpl(packageReference, pakFile, createBackupSlug)
    packagePathCache.set(keyToFind, returnValue);
  }

  return packagePathCache.get(keyToFind);
}


async function resolveSlugFromPackageReferenceImpl(packageReference: packageReference<any>,
                                                   pakFile: PakFile,
                                                   createBackupSlug: boolean) {
  const {name, package: packagePath} = packageReference;

  switch (name) {
    case 'BP_WorkBenchComponent_C':
    case 'BP_WorkBenchComponent':
      return 'building-work-bench-integrated'
    case 'FGBuildableAutomatedWorkBench':
      return 'building-automated-work-bench';
    case 'BP_BuildGun_C':
    case 'BP_BuildGun':
    case 'FGBuildGun':
      return 'building-equipment-descriptor-build-gun';
    case 'BP_WorkshopComponent_C':
    case 'BP_WorkshopComponent':
      return 'building-workshop'
  }

  const possibleFilePath = [packagePath, name].join('/') + '.uasset';

  if (pakFile.entries.has(possibleFilePath)) {
    const referenceFile = (await pakFile.getFiles([possibleFilePath]))[0];

    try {
      if (referenceFile.specialTypes.has('Texture2D')) {
        return `image-${toKebabCase(name)}`
      }

      const resolvedExports = await resolveExports(pakFile, referenceFile);
      const mainClass = await findMainClass(resolvedExports);

      if (mainClass?.exportTypes && schematicClasses.has(mainClass.exportTypes)) {
        const schematicName = name.match(/^(Schematic_|SC_)?(.*?)(_C)?$/)![2];
        return `schematic-${toKebabCase(schematicName)}`;
      }

      if (mainClass?.exportTypes && recipeClasses.has(mainClass.exportTypes)) {
        const recipeName = name.match(/^Recipe_(.*?)(_C)?$/)![1];
        return `recipe-${toKebabCase(recipeName)}`;
      }

      if (mainClass?.exportTypes && itemClasses.has(mainClass.exportTypes)) {
        const itemName = name.match(/^(BP_|Desc_)(.*?)(_C)?$/)![2];
        return `item-${toKebabCase(itemName)}`;
      }
      if (mainClass?.exportTypes && buildingClasses.has(mainClass.exportTypes)) {
        const buildingName = name.match(/^(Build_|BP)(.*?)(_C)?$/)![2];
        return `building-${toKebabCase(buildingName)}`;
      }
    } catch(e) {
      const resolvedExports = await resolveExports(pakFile, referenceFile);
      const mainClass = await findMainClass(resolvedExports);
      console.log("Unprocessed slug", mainClass?.exportTypes, name, e)
      process.exit(1);
    }
  }


  //
  //
  // if (/^FactoryGame\/Content\/FactoryGame\/Buildable/.test(packagePath)
  //  ||/^FactoryGame\/Content\/FactoryGame\/Events\/.*\/Buildings\//.test(packagePath)) {
  //   if (/^Build_(.*)(_C)?$/.test(name)) {
  //     const buildingName = name.match(/^Build_(.*?)(_C)?$/)![1];
  //     return `building-${toKebabCase(buildingName)}`;
  //   } else if (/^Desc_(.*)(_C)?$/.test(name)) {
  //     const buildingName = name.match(/^Desc_(.*?)(_C)?$/)![1];
  //     return `item-${toKebabCase(buildingName)}`;
  //   }
  // }
  //
  // // It's a resource aka item
  // if (/^FactoryGame\/Content\/FactoryGame\/Resource/.test(packagePath)
  //   || /^FactoryGame\/Content\/FactoryGame\/.*\/Parts/.test(packagePath)) {
  //   if (/^Desc_(.*)(_C)?$/.test(name)) {
  //     const itemName = name.match(/^Desc_(.*?)(_C)?$/)![1];
  //     return `item-${toKebabCase(itemName)}`;
  //   } else if (/^BP_(.*)(_C)?$/.test(name)) {
  //     const itemName = name.match(/^BP_(.*?)(_C)?$/)![1];
  //     return `item-${toKebabCase(itemName)}`;
  //   }
  // }
  //
  // // It's an equipment aka item
  // if (/^FactoryGame\/Content\/FactoryGame\/Equipment/.test(packagePath)
  // ) {
  //   if (/^Desc_(.*)(_C)?$/.test(name)) {
  //     const itemName = name.match(/^Desc_(.*?)(_C)?$/)![1];
  //     return `item-${toKebabCase(itemName)}`;
  //   } else if (/^BP_(.*)(_C)?$/.test(name)) {
  //     const itemName = name.match(/^BP_(.*?)(_C)?$/)![1];
  //     return `item-${toKebabCase(itemName)}`;
  //   }
  // }
  //
  // // It's a recipe
  // if (/^FactoryGame\/Content\/FactoryGame\/Recipes/.test(packagePath)
  // || /^FactoryGame\/Content\/FactoryGame\/Events/.test(packagePath)) {
  //   if (/^Recipe_(.*)(_C)?$/.test(name)) {
  //     const recipeName = name.match(/^Recipe_(.*?)(_C)?$/)![1];
  //     return `recipe-${toKebabCase(recipeName)}`;
  //   }
  // }
  //
  // // It's a schematic
  // if (/^FactoryGame\/Content\/FactoryGame\/Schematics/.test(packagePath) ||
  //   /^FactoryGame\/Content\/FactoryGame\/Events/.test(packagePath)) {
  //   if (/^(Schematic_|SC_)?(.*)(_C)?$/.test(name)) {
  //     const recipeName = name.match(/^(Schematic_|SC_)?(.*?)(_C)?$/)![2];
  //     return `schematic-${toKebabCase(recipeName)}`;
  //   }
  // }


  if (createBackupSlug) {


    const pathParts = ['slug::nonstandard'];
    const namePart = name.replace(/_C$/, '').replace(/_/g, '-');
    const packagePathString = packagePath.replace('FactoryGame/Content/FactoryGame/', '').replace(/[\/_]/g, "-");
    if (packagePathString) {
      pathParts.push(toKebabCase(packagePathString))
    }
    pathParts.push(toKebabCase(namePart))

    return pathParts.join('-').replace(/--+/g, '-');
  }

  //TODO: probably fix this somehow
  return undefined;
}

export function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}