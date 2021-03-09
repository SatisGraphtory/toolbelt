#!/usr/bin/env node
import 'reflect-metadata';
// @ts-ignore
import {utils} from '@local/utils';

// @ts-ignore
import { paths } from '@local/paths';

import * as fs from 'fs';
import * as glob from 'glob';

import {FileReader} from '../src/readers/FileReader';
import {PakFile} from "../src/pak/PakFile";
import {deserialize, serialize} from "class-transformer";
import getAllSchematicFilenames from "../src/processor/steps/getAllSchematicFilenames";
import getDocs from "../src/processor/steps/getDocs";
import {resolveExports, unresolvedExports} from "../src/processor/resolvers/resolveExports";
import getSchematics from "../src/processor/steps/schematics/getSchematics";
import getAllRecipeFilenames from "../src/processor/steps/getAllRecipeFilenames";
import {marshallRecipes} from "../src/processor/marshaller/marshallRecipes";
import consoleInspect from "../src/util/consoleInspect";
import path from "path";
import {EmitContext} from "../../headers-to-interfaces/emit";
import {pretty} from "../src/util/pretty";

// import RecipeJson from "../../../.DataLanding/objects/recipes";
import { UFGRecipe } from '../../../.DataLanding/interfaces';
import {marshallSchematics} from "../src/processor/marshaller/marshallSchematics";

const DEFAULT_INSTALL_DIR = '/mnt/a/Games/Epic/SatisfactoryExperimental';

const DEFAULT_PAK_PATH = DEFAULT_INSTALL_DIR + '/FactoryGame/Content/Paks/FactoryGame-WindowsNoEditor.pak';
const DEFAULT_EXE_PATH = DEFAULT_INSTALL_DIR + '/FactoryGame.exe';

main().catch(e => {
  console.log(e);
});

async function main() {
  const pakFilePath = process.env.PAK_PATH || DEFAULT_PAK_PATH;
  const exeFilePath = process.env.EXE_PATH || DEFAULT_EXE_PATH;

  const cachedPakMetadataBaseString: string = "./pak-dump";

  const version = await utils.exe.getExeVersion(exeFilePath);

  const reader = new FileReader(pakFilePath);
  await reader.open();

  let pakFile;

  const cachedPakMetadata = `${cachedPakMetadataBaseString}.${version}.json`

  const existingFiles = glob.sync(cachedPakMetadataBaseString + '*');

  if (fs.existsSync(cachedPakMetadata)) {
    pakFile = deserialize(PakFile, fs.readFileSync(cachedPakMetadata, 'utf8'));
    pakFile.optimizeLoadFromFile(reader);
  } else {
    // Delete old files
    if (existingFiles) {
      for (const file of existingFiles) {
        fs.unlinkSync(file);
      }
    }

    pakFile = new PakFile(reader);
    await pakFile.initialize();

    let serializedPak = serialize(pakFile);
    fs.writeFileSync(cachedPakMetadata, serializedPak);
  }

  console.log("Finished loading PakFile")

  const docObjects = await getDocs(pakFile);

  const parsedDocPath = path.join(paths.dataLanding.supplimentary, 'ParsedDocs.json');

  fs.mkdirSync(paths.dataLanding.supplimentary, { recursive: true });

  function replacer(key: string, value: any) {
    if(value instanceof Map) {
        return Object.fromEntries(value)
    } else {
      return value;
    }
  }

  fs.writeFileSync(parsedDocPath, JSON.stringify(docObjects, replacer, 2))

  // const fileNameList = ['FactoryGame/Content/FactoryGame/Schematics/Tutorial/Schematic_Tutorial5.uexp']
  const fileNameList =  Array.from(pakFile.entries.keys());
  const schematicFiles = await getAllSchematicFilenames(fileNameList);
  const {schematics, dependencies: schematicDependencies } = await marshallSchematics(pakFile, schematicFiles, docObjects)

  console.log(schematicDependencies);

  const recipeFiles = await getAllRecipeFilenames(fileNameList);

  // const {recipes, dependencies: recipeDependencies} = await marshallRecipes(pakFile, recipeFiles, docObjects)
  // //
  // const recipeNativeMap = {} as Record<string, any>;
  //
  // for (const [key, value] of recipes.entries()) {
  //   recipeNativeMap[key] = value;
  // }
  //
  // const destDir = path.resolve(paths.dataLanding.objects);
  //
  // fs.rmdirSync(destDir, { recursive: true });
  //
  // fs.mkdirSync(destDir, { recursive: true });
  //
  // fs.writeFileSync(path.join(destDir, 'recipes.ts'), pretty(`const RecipeJson = ${JSON.stringify(recipeNativeMap)}; export default RecipeJson`), 'utf-8');
  //
  // // console.log(RecipeJson as Record<string, UFGRecipe>);
  //
  // // const schematicPackageFiles = await getSchematics(pakFile, schematicFiles);
  // //
  // // for (const schematicFile of schematicPackageFiles) {
  // //   const resolvedObject = await resolveExports(pakFile, schematicFile, docObjects);
  // // }
  // // const loadFile = await pakFile.getFiles(['FactoryGame/Content/FactoryGame/Buildable/Factory/ConveyorBeltMk5/Build_ConveyorBeltMk5.uexp']);
  // // const loadFile = await pakFile.getFiles(['FactoryGame/Content/FactoryGame/Buildable/Factory/MinerMk3/Build_MinerMk3.uexp']);
  //
  // // const resolvedObject = await resolveExports(pakFile, loadFile[0]);
  // // console.log(resolvedObject);
  //
  // //TODO: try out recipe for marshaller (ItemClass)
  //
  // console.log("Cleaning up: ")
  // console.log("Unresolved exports:", unresolvedExports);

  // process.exit();
}


