import {packageReference} from "../../../../headers-to-interfaces/emit/native/references";

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

export function createPackageReferenceFromFilename(filePath: string): packageReference<any> {
  const paths = filePath.split('/');

  const fullName = paths.pop()!;

  const classNameParts = fullName.split('.');

  const className = classNameParts.shift()!;

  const pkg = paths.join('/').replace('/Game/', 'FactoryGame/Content/');

  const packageReference = {
    name: className,
    package: pkg
  }

  return {
    ...packageReference,
    slug: resolveSlugFromPackageReference(packageReference)
  }
}

export function resolveSlugFromPackageReference(packageReference: packageReference<any>) {
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
  if (/^FactoryGame\/Content\/FactoryGame\/Resource/.test(packagePath)) {
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

export function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}