#!/usr/bin/env node
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import {FileReader} from '../src/readers/FileReader';
import {PakFile} from "../src/pak/PakFile";
import {deserialize, serialize} from "class-transformer";

const DEFAULT_INSTALL_DIR = '/mnt/a/Games/Epic/SatisfactoryExperimental';

const DEFAULT_PAK_PATH = DEFAULT_INSTALL_DIR + '/FactoryGame/Content/Paks/FactoryGame-WindowsNoEditor.pak';
// const DEFAULT_EXE_PATH = DEFAULT_INSTALL_DIR + '/FactoryGame.exe';

main();

async function main() {
  const pakFilePath = process.env.PAK_PATH || DEFAULT_PAK_PATH;
  // const exeFilePath = process.env.EXE_PATH || DEFAULT_EXE_PATH;

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
    await fs.writeFileSync(cachedPakMetadata, serializedPak);
  }

  // now pakfile is not null;

  //
  const retrievedFiles = await pakFile.getFiles(['FactoryGame/Content/FactoryGame/Schematics/Alternate/New_Update3/Schematic_Alternate_AdheredIronPlate.uasset']);
}