import {PakFile} from "../../pak/PakFile";
import {Marshaller} from "./marshaller";
import {UObject} from "../../pak/pakfile/UObject";
import {findMainClass, resolveExports} from "../resolvers/resolveExports";
import {getObjectNameFromFilename} from "../../util/pakUtils";
import {UFGRecipe} from "../../../../../.DataLanding/interfaces/classes";
import {createPackageReferenceFromFilename} from "../resolvers/resolveSlugs";

async function marshallRecipe(pakFile: PakFile, recipe: UObject, docObject: Map<string, Map<string, any>>, recipeMarshaller: Marshaller, baseClass: string, defaultsMap: Map<string, any>, useDefaults = false) {
  const name = await getObjectNameFromFilename(recipe.uasset.filename)

  const resolvedExports = await resolveExports(pakFile, recipe);

  const mainClass = await findMainClass(resolvedExports);

  const docEntry = docObject.get(name)!;

  if (mainClass) {
    return recipeMarshaller.marshalFromPropertyList<UFGRecipe>(mainClass.propertyList, baseClass, defaultsMap, docEntry, useDefaults);
  } else {
    throw new Error("Could not find main class for recipe file " + recipe.uasset.filename)
  }
}

export async function marshallRecipes(pakFile: PakFile, recipeFiles: Set<string>, docObject: Map<string, Map<string, any>>) {
  // Only use UObjects that aren't UTexture2D.
  const recipeMarshaller = new Marshaller();

  // We shouldn't save display name as a default
  recipeMarshaller.addBlacklistedDefaultKeys(['mDisplayName']);
  recipeMarshaller.setMissingDefaultHandlerFunction((propName: string) => {
    // TODO: extract this out for custom handling
    switch(propName) {
      case 'mDisplayName':
        return {
          namespace: '',
          key: '',
          sourceString: ''
        }
      default:
        break;
    }
  })

  const recipeEntries = (await pakFile.getFiles([...recipeFiles])).filter(item => {
    return item instanceof UObject;
  }) as UObject[];

  const missingRecipes: UObject[] = [];

  const defaultsMap = new Map<string, any>();

  const baseClass = 'UFGRecipe';

  const recipes: Map<string, UFGRecipe> = new Map();

  for (const recipeFile of recipeEntries) {
    const name = await getObjectNameFromFilename(recipeFile.uasset.filename)
    if (docObject.has(name)) {

      const recipe = await marshallRecipe(pakFile, recipeFile, new Map(), recipeMarshaller, baseClass, defaultsMap, false);
      const packageReference = createPackageReferenceFromFilename(recipeFile.uasset.filename);
      recipes.set(packageReference.slug as string, recipe);
    } else {
      missingRecipes.push(recipeFile)
    }
  }

  for (const missingRecipe of missingRecipes) {
    const recipe = await marshallRecipe(pakFile, missingRecipe, new Map(), recipeMarshaller, baseClass, defaultsMap, true);

    const packageReference = createPackageReferenceFromFilename(missingRecipe.uasset.filename);
    recipes.set(packageReference.slug as string, recipe);
  }

  return {
    recipes,
    dependencies: recipeMarshaller.getDependencies().filter((dep) => {
      return !recipeFiles.has(dep);
    })
  }
}