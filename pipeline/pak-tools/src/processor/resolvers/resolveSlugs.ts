import {packageReference} from "../../../../headers-to-interfaces/emit/native/references";
import {PakFile} from "../../pak/PakFile";
import {UObject} from "../../pak/pakfile/UObject";

export function resolveSlug(name: string, packagePath: string) {
  if (/^Build_(.*)_C$/.test(name)) {
    const buildingName = name.match(/^Build_(.*)_C$/)![1];
    return `building-${toKebabCase(buildingName)}`;
  }
  // BUILD_ -> building
  // DESC_BLAH -> item

  switch(name) {
    case 'BP_WorkBenchComponent_C':
      return 'building-work-bench-integrated'
    case 'FGBuildableAutomatedWorkBench':
      return 'building-work-bench-component';
    case 'BP_BuildGun_C':
    case 'FGBuildGun':
      return 'building-build-gun';
    case 'BP_WorkshopComponent_C':
      return 'building-workshop'
  }

  throw new Error("Unknown slug " + name + " with path " + packagePath)
}

export async function resolveSlugFromPath(fullPath: string, pakFile: PakFile) {
  const pathParsed = fullPath.split('/');
  const fileNameRaw = pathParsed.pop()!;
  const pathMain = pathParsed.join('/');

  let fileName = fileNameRaw;

  if (fileName.indexOf('.') !== -1) {
    const fileNameList = fileNameRaw.split('.');
    fileNameList.pop();
    fileName = fileNameList.join('.')
  }

  let slug = await resolveSlugFromPackageReference({
    package: pathMain,
    name: fileName,
  }, pakFile, true);

  if (slug === undefined) {
    throw new Error("Could not make slug from " + fullPath);
  }

  return slug;
}
export async function resolveSlugFromPackageReference(packageReference: packageReference<any>,
                                                pakFile: PakFile,
                                                createBackupSlug = true) {
  const {name, package: packagePath} = packageReference;

  if (/^FactoryGame\/Content\/FactoryGame\/Buildable/.test(packagePath)) {
    if (/^Build_(.*)(_C)?$/.test(name)) {
      const buildingName = name.match(/^Build_(.*?)(_C)?$/)![1];
      return `building-${toKebabCase(buildingName)}`;
    } else if (/^Desc_(.*)(_C)?$/.test(name)) {
      const buildingName = name.match(/^Desc_(.*?)(_C)?$/)![1];
      return `item-${toKebabCase(buildingName)}`;
    }
  }

  // It's a resource aka item
  if (/^FactoryGame\/Content\/FactoryGame\/Resource/.test(packagePath)
    || /^FactoryGame\/Content\/FactoryGame\/.*\/Parts/.test(packagePath)) {
    if (/^Desc_(.*)(_C)?$/.test(name)) {
      const itemName = name.match(/^Desc_(.*?)(_C)?$/)![1];
      return `item-${toKebabCase(itemName)}`;
    } else if (/^BP_(.*)(_C)?$/.test(name)) {
      const itemName = name.match(/^BP_(.*?)(_C)?$/)![1];
      return `item-${toKebabCase(itemName)}`;
    }
  }

  // It's an equipment aka item
  if (/^FactoryGame\/Content\/FactoryGame\/Equipment/.test(packagePath)) {
    if (/^Desc_(.*)(_C)?$/.test(name)) {
      const itemName = name.match(/^Desc_(.*?)(_C)?$/)![1];
      return `item-${toKebabCase(itemName)}`;
    } else if (/^BP_(.*)(_C)?$/.test(name)) {
      const itemName = name.match(/^BP_(.*?)(_C)?$/)![1];
      return `item-${toKebabCase(itemName)}`;
    }
  }

  // It's a recipe
  if (/^FactoryGame\/Content\/FactoryGame\/Recipes/.test(packagePath)) {
    if (/^Recipe_(.*)(_C)?$/.test(name)) {
      const recipeName = name.match(/^Recipe_(.*?)(_C)?$/)![1];
      return `recipe-${toKebabCase(recipeName)}`;
    }
  }

  // It's a schematic
  if (/^FactoryGame\/Content\/FactoryGame\/Schematics/.test(packagePath)) {
    if (/^(Schematic_|SC_)?(.*)(_C)?$/.test(name)) {
      const recipeName = name.match(/^(Schematic_|SC_)?(.*?)(_C)?$/)![2];
      return `schematic-${toKebabCase(recipeName)}`;
    }
  }

  switch(name) {
    case 'BP_WorkBenchComponent_C':
      return 'building-work-bench-integrated'
    case 'FGBuildableAutomatedWorkBench':
      return 'building-work-bench-component';
    case 'BP_BuildGun_C':
    case 'FGBuildGun':
      return 'building-build-gun';
    case 'BP_WorkshopComponent_C':
      return 'building-workshop'
  }

  // const schematicEntriesRaw = (await pakFile.getFiles(schematicFiles)).filter(item => {
  //   return item instanceof UObject;
  // }) as UObject[];

  if (createBackupSlug) {
    const pathParts = ['slug::nonstandard'];
    const namePart = name.replace(/_C$/, '').replace(/_/g, '-');
    const packagePathString = packagePath.replace('FactoryGame/Content/FactoryGame/', '').replace(/[\/_]/g, "-");
    if (packagePathString) {
      pathParts.push(packagePathString.toLowerCase())
    }
    pathParts.push(namePart.toLowerCase())

    return pathParts.join('-').replace(/--+]/g, '-');
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