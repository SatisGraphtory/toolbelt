#!/usr/bin/env node
import 'reflect-metadata';
// @ts-ignore
import {utils} from '@local/utils';

// @ts-ignore
import {paths} from '@local/paths';

import * as fs from 'fs';
import * as glob from 'glob';

import {FileReader} from '../src/readers/FileReader';
import {PakFile} from "../src/pak/PakFile";
import getAllSchematicFilenames from "../src/processor/steps/schematics/getAllSchematicFilenames";
import getDocs from "../src/processor/steps/docs/getDocs";
import getAllRecipeFilenames from "../src/processor/steps/recipes/getAllRecipeFilenames";
import path from "path";

import {
  EFactoryConnectionDirection,
  EPipeConnectionType,
  EResourceForm,
  UFGItemDescriptor,
  UFGRecipe,
  UFGSchematic
} from '../../../.DataLanding/interfaces';

import {marshallSubclassGeneric} from "../src/processor/marshaller/genericMarshaller";
import getAllItemFilenames from "../src/processor/steps/items/getAllItemFilenames";
import getAllBuildableFilenames from "../src/processor/steps/buildables/getAllBuildableFilenames";
import ConnectionMapper from "../src/processor/steps/ConnectionMapper";
import createEnumRevision from "../src/processor/steps/serialization/generateEnums";
import {getAllImages} from "../src/processor/steps/images/getAllImages";
import PakTranslator from "../src/processor/steps/localize/PakTranslator";
import generateClassMap from "../src/processor/steps/classMap/generateClassMap";
import consoleInspect from "../src/util/consoleInspect";
import sharp from "sharp";

const DEFAULT_INSTALL_DIR = '/mnt/a/Games/Epic/SatisfactoryExperimental';

const DEFAULT_PAK_PATH = DEFAULT_INSTALL_DIR + '/FactoryGame/Content/Paks/FactoryGame-WindowsNoEditor.pak';
const DEFAULT_EXE_PATH = DEFAULT_INSTALL_DIR + '/FactoryGame.exe';

main().catch(e => {
  console.log(e);
});

async function main() {
  const pakFilePath = process.env.PAK_PATH || DEFAULT_PAK_PATH;
  const exeFilePath = process.env.EXE_PATH || DEFAULT_EXE_PATH;

  const cachedPakMetadataBaseString: string = "./dumps/pak-dump";

  const version = await utils.exe.getExeVersion(exeFilePath);

  const reader = new FileReader(pakFilePath);
  await reader.open();

  let pakFile;

  const cachedPakMetadata = `${cachedPakMetadataBaseString}.${version}.json`

  const existingFiles = glob.sync(cachedPakMetadataBaseString + '*');
  fs.mkdirSync("./dumps", { recursive: true })

  pakFile = new PakFile(reader);
  await pakFile.initialize();
  //
  // if (fs.existsSync(cachedPakMetadata)) {
  //   pakFile = deserialize(PakFile, fs.readFileSync(cachedPakMetadata, 'utf8'));
  //   // pakFile.optimizeLoadFromFile(reader);
  // } else {
  //   // Delete old files
  //   if (existingFiles) {
  //     for (const file of existingFiles) {
  //       fs.unlinkSync(file);
  //     }
  //   }
  //
  //   pakFile = new PakFile(reader);
  //   await pakFile.initialize();
  //
  //   let serializedPak = serialize(pakFile);
  //   fs.writeFileSync(cachedPakMetadata, serializedPak);
  // }



  const file = await pakFile.getFiles(["FactoryGame/Content/FactoryGame/Resource/Parts/AnimalParts/UI/IconDesc_HogPart_256.uasset"])
  // const image = sharp(file[0].data);
  let n = 0;
  for (const exp of file[0].specialTypes.get('Texture2D')!) {
    const file = exp.getImage();
    fs.writeFileSync("demo" + n++ + ".png", file.data)
  }
  //
  //
  // const allClasses = [...pakFile.entries.keys()].sort().join("\n");
  // console.log("Finished loading PakFile")
  // fs.writeFileSync("allFoundFiles.txt", allClasses);
  //
  // console.log("Finished writing PakFile")
  //
  // const globalDict = {} as Record<string, any>;
  //
  // for (const entry of pakFile.entries.keys()) {
  //   if (entry.endsWith('.uasset')) {
  //     console.log("Processing export for", entry);
  //     const classes = await pakFile.getExportType(entry);
  //     if (classes) {
  //       globalDict[classes.path] = classes.exports;
  //     }
  //   }
  // }
  //
  // fs.writeFileSync("classDump.json", JSON.stringify(globalDict, null, 2))
  //




  // /** Get and write out recipes.json **/
  // const genericFiles = new Set(['FactoryGame/Content/FactoryGame/Equipment/BoomBox/Equip_BoomBox.uasset']);
  //
  // const {collapsedObjectMap: schematicMap, dependencies: schematicDependencies, slugToClassMap: schematicSlugMap } = await marshallSubclassGeneric<any>(pakFile,
  //   genericFiles, {}, "UFGEquipmentDescriptor", false, false, true)
  //
  // console.log(schematicMap);


  // const genericFiles = new Set(['FactoryGame/Content/FactoryGame/Schematics/Alternate/New_Update4/Schematic_Alternate_ClassicBattery.uasset']);
  //
  // const {collapsedObjectMap: schematicMap, dependencies: schematicDependencies, slugToClassMap: schematicSlugMap } = await marshallSubclassGeneric<UFGSchematic>(pakFile,
  //   genericFiles, {}, "UFGSchematic", false, false, true)




  // const {collapsedObjectMap: recipeMap,  slugToClassMap: recipeSlugMap } = await marshallSubclassGeneric<UFGRecipe>(pakFile,
  //   recipeFiles, {}, "UFGRecipe", false, false, true)

  // consoleInspect(schematicMap);
}


