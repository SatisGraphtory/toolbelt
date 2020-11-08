#!/usr/bin/env node
import 'reflect-metadata';
import * as fs from 'fs';
import {FileReader} from '../src/readers/FileReader';
import {PakFile} from "../src/pak/PakFile";
import {deserialize, serialize} from "class-transformer";
import getAllRecipeFilenames from "../src/processor/steps/getAllRecipeFilenames";
import getAllSchematicFilenames from "../src/processor/steps/getAllSchematicFilenames";
import getDocs from "../src/processor/steps/getDocs";

const DEFAULT_PAK_PATH = '/mnt/a/Games/Epic/SatisfactoryExperimental/FactoryGame/Content/Paks/FactoryGame-WindowsNoEditor.pak';

main();

async function main() {
  const pakFilePath = process.env.PAK_PATH || DEFAULT_PAK_PATH;

  const cachedPakMetadata: string = "./pak-dump";

  const reader = new FileReader(pakFilePath);
  await reader.open();

  let pakFile;

  if (fs.existsSync(cachedPakMetadata)) {
    pakFile = deserialize(PakFile, fs.readFileSync(cachedPakMetadata, 'utf8'));
    pakFile.optimizeLoadFromFile(reader);
  } else {
    //
    pakFile = new PakFile(reader);
    await pakFile.initialize();

    let serializedPak = serialize(pakFile);
    fs.writeFileSync(cachedPakMetadata, serializedPak);
  }

  const docs = await getDocs();

  console.log(docs);

  const fileNameList = Array.from(pakFile.entries.keys());

  const recipeFiles = await getAllRecipeFilenames(fileNameList);
  const schematicFiles = await getAllSchematicFilenames(fileNameList);
}