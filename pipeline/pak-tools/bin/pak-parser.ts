#!/usr/bin/env node
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import {FileReader} from '../src/readers/FileReader';
import {PakFile} from "../src/pak/PakFile";
import {deserialize, serialize} from "class-transformer";

const DEFAULT_PAK_PATH = '/mnt/a/Games/Epic/SatisfactoryExperimental/FactoryGame/Content/Paks/FactoryGame-WindowsNoEditor.pak';

main();

async function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8',function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function writeFile(path: string, data: any) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function (err) {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

async function main() {
  const pakFilePath = process.env.PAK_PATH || DEFAULT_PAK_PATH;

  const cachedPakMetadata: string = "./pak-dump";

  const reader = new FileReader(pakFilePath);
  await reader.open();

  let pakFile;

  if (fs.existsSync(cachedPakMetadata)) {
    pakFile = deserialize(PakFile, await readFile(cachedPakMetadata));
    pakFile.optimizeLoadFromFile(reader);
  } else {
    //
    pakFile = new PakFile(reader);
    await pakFile.initialize();

    let serializedPak = serialize(pakFile);
    await writeFile(cachedPakMetadata, serializedPak);
  }

  // now pakfile is not null;

  //
  const retrievedFiles = await pakFile.getFiles(['FactoryGame/Content/FactoryGame/Buildable/Factory/PipelineMk2/Build_PipelineMK2.uasset']);
}