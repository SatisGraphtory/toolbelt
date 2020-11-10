#!/usr/bin/env node
import 'reflect-metadata';
// @ts-ignore
import {utils} from '@local/utils';

import * as fs from 'fs';
import * as glob from 'glob';

import {FileReader} from '../src/readers/FileReader';
import {PakFile} from "../src/pak/PakFile";
import {deserialize, serialize} from "class-transformer";
import getAllSchematicFilenames from "../src/processor/steps/getAllSchematicFilenames";
import getDocs from "../src/processor/steps/getDocs";
import {resolveExports, unresolvedExports} from "../src/processor/resolvers/resolveExports";

const DEFAULT_INSTALL_DIR = '/mnt/a/Games/Epic/SatisfactoryExperimental';

const DEFAULT_PAK_PATH = DEFAULT_INSTALL_DIR + '/FactoryGame/Content/Paks/FactoryGame-WindowsNoEditor.pak';
const DEFAULT_EXE_PATH = DEFAULT_INSTALL_DIR + '/FactoryGame.exe';

main();

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

  const docObjects = await getDocs();
  //
  // // console.log(util.inspect(docs, false, null, true ));

  const fileNameList = Array.from(pakFile.entries.keys());
  // const schematicFiles = await getAllSchematicFilenames(['FactoryGame/Content/FactoryGame/Schematics/Progression/Schematic_4-1.uexp']);

  const schematicFiles = await getAllSchematicFilenames(fileNameList);

  // const schematicPackageFiles = await getSchematics(pakFile, schematicFiles);

  // for (const schematicFile of schematicPackageFiles) {
  //   const resolvedObject = await resolveExports(pakFile, schematicFile, docObjects);
  // }
  const loadFile = await pakFile.getFiles(['FactoryGame/Content/FactoryGame/Buildable/Factory/ConveyorBeltMk5/Build_ConveyorBeltMk5.uexp']);
  const resolvedObject = await resolveExports(pakFile, loadFile[0], docObjects);
  // console.log(resolvedObject);

  console.log("Cleaning up: ")
  console.log("Unresolved exports:", unresolvedExports);

  process.exit();
}