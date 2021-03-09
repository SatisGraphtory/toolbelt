import {PakFile} from "../../pak/PakFile";
import {Marshaller} from "./marshaller";
import {UObject} from "../../pak/pakfile/UObject";
import {findMainClass, resolveExports} from "../resolvers/resolveExports";
import {getObjectNameFromFilename} from "../../util/pakUtils";
import {UFGRecipe, UFGSchematic} from "../../../../../.DataLanding/interfaces/classes";
import {createPackageReferenceFromFilename} from "../resolvers/resolveSlugs";
import * as fs from 'fs';
import util from "util";
import consoleInspect from "../../util/consoleInspect";

async function marshallSchematic(pakFile: PakFile, schematic: UObject,
                                 docEntry: Record<string, Record<string, any>>,
                                 recipeMarshaller: Marshaller,
                                 baseClass: string) {
  const name = await getObjectNameFromFilename(schematic.uasset.filename)

  const resolvedExports = await resolveExports(pakFile, schematic);

  const mainClass = await findMainClass(resolvedExports);

  if (mainClass) {
    return recipeMarshaller.marshalFromPropertyListV2<UFGRecipe>(
      mainClass.propertyList, baseClass, docEntry, true);
  } else {
    throw new Error("Could not find main class for recipe file " + schematic.uasset.filename)
  }
}

export async function marshallSchematics(pakFile: PakFile, schematicFiles: Set<string>,
                                         docObject: Record<string, Record<string, Record<string, any>>>) {
  // Only use UObjects that aren't UTexture2D.
  const schematicMarshaller = new Marshaller(pakFile);

  const schematicEntries = (await pakFile.getFiles([...schematicFiles])).filter(item => {
    return item instanceof UObject;
  }) as UObject[];

  const providedSchematics = docObject["FGSchematic"]!;

  const schematicList = [] as UFGSchematic[];

  for (const schematicEntry of schematicEntries) {
    const name = schematicEntry.uasset.filename.match(/^.*\/([A-Za-z_0-9\-]+)\.uasset/)![1];
    const correspondingDocsEntry = providedSchematics[name + "_C"];
     if (correspondingDocsEntry) {
       const marshalledSchematic = await marshallSchematic(
         pakFile, schematicEntry,
         correspondingDocsEntry,
         schematicMarshaller, "UFGSchematic");
       schematicList.push(marshalledSchematic as unknown as UFGSchematic);
     }
  }

  schematicMarshaller.determineAndAddMissingDependencies<UFGSchematic>(schematicList);

  return {
    schematics: schematicList,
    dependencies: schematicMarshaller.getDependencies().filter((dep) => {
      return !schematicFiles.has(dep);
    })
  }
}