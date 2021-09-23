#!/usr/bin/env node
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { paths } from '@local/paths';
import {exiftool} from 'exiftool-vendored';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import * as VDF from '@node-steam/vdf';

const AdmZip = require('adm-zip');

require('dotenv').config()

const NEWS_OTHER = 'http://ingamenews.satisfactorygame.com/other.news';
const NEWS_EXPERIMENTAL = 'http://ingamenews.satisfactorygame.com/experimental.news';
const NEWS_MAIN = 'http://ingamenews.satisfactorygame.com/main.news';

const { execSync } = require("child_process");

import * as prettier from 'prettier';

const DEFAULT_INSTALL_DIR_EXPERIMENTAL = '/mnt/a/Games/Epic/SatisfactoryExperimental';
const DEFAULT_INSTALL_DIR_RELEASE = '/mnt/a/Games/Epic/SatisfactoryEarlyAccess';

const DEFAULT_PAK_PATH_PART = 'FactoryGame/Content/Paks/FactoryGame-WindowsNoEditor.pak';
const DEFAULT_EXE_PATH_PART = 'FactoryGame.exe';


let INSTALL_DIR = process.env.INSTALL_DIR || DEFAULT_INSTALL_DIR_RELEASE;
let BRANCH = "master"
let NEWS_SOURCE = NEWS_MAIN;

let VERSION = 0;
let SEMANTIC = '';

main();

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  if (process.env.EXPERIMENTAL) {
    INSTALL_DIR = process.env.EXPERIMENTAL_INSTALL_DIR || DEFAULT_INSTALL_DIR_EXPERIMENTAL;
    BRANCH = "experimental"
    NEWS_SOURCE = NEWS_EXPERIMENTAL;

    console.log(execSync(`cd ${paths.sourceData.root}; git clean -d -n; git reset --hard; \
      git checkout experimental; git pull`).toString())
  } else {
    console.log(execSync(`cd ${paths.sourceData.root}; git clean -d -n; git reset --hard; \
      git checkout master; git pull`).toString())
  }

  console.log(execSync(`rm -rf ${paths.sourceData.headers}/* ${paths.sourceData.docs}/* \
  ${path.join(paths.sourceData.root, "metadata.json")}`).toString())

  await sleep(1000);

  await copyDocs();
  await copyHeaders();
  await generateMetadataJson();
  await commitFiles();
}

async function copyDocs(sourceDocFolder = path.join(INSTALL_DIR, 'CommunityResources', 'Docs'),
                        targetDocFolder = path.join(paths.sourceData.docs)) {
  console.log(sourceDocFolder);
  fs.copyFileSync(path.join(sourceDocFolder, 'Docs.json'), path.join(targetDocFolder, 'Docs.json'));
  console.log("Copied docs.")
}

async function copyHeaders(sourceHeaderFolder = path.join(INSTALL_DIR, 'CommunityResources'),
                        targetHeaderFolder = path.join(paths.sourceData.headers)) {

  const files = fs.readdirSync(targetHeaderFolder);
  for (const file of files) {
    fs.unlinkSync(path.join(targetHeaderFolder, file));
  }

  const headers = new AdmZip(path.join(sourceHeaderFolder, "Headers.zip"));

  headers.extractAllTo(targetHeaderFolder, true);

  console.log("Copied Headers.")
}

async function fetchVersions(url: string) {
  const response = await fetch(url);
  const body = await response.text();

  const root = parse(body).querySelector('body');
  if (root.firstChild.rawText === '\n') {
    const titleString = root.childNodes[1].rawText.split('</>')[0].replace(/\u2013|\u2014/g, "-");

    const versions = titleString.split('-').map(item => item.trim());

    let semanticVersion = ''
    if (versions[1].charAt(0) == 'v') {
      semanticVersion = versions[1].substring(1);
    }

    let buildNumber = 0;
    if (versions[2].includes('Build ')) {
      buildNumber = parseInt(versions[2].split('Build ')[1]);
    }

    if (semanticVersion !== '' && buildNumber != 0) {
      return {
        semanticVersion,
        buildNumber
      };
    }
  }

  throw new Error("Could not extract semantic and build numbers from " + url);
}

async function generateMetadataJson() {
  const exeFilePath = path.join(INSTALL_DIR, DEFAULT_EXE_PATH_PART);
  const tags = await exiftool.read(exeFilePath);
  await exiftool.end();

  const buildNumber = parseInt((tags as any).ProductVersion.match(/^\+\+FactoryGame.*-CL-([0-9]+)$/)![1]);
  console.log(NEWS_SOURCE);
  const news = await fetchVersions(NEWS_SOURCE);

  if (news.buildNumber !== buildNumber) {
    if (news.buildNumber < buildNumber) {
      throw new Error(`The file build number (${buildNumber}) and the news build number (${news.buildNumber}) do not match!`)
      // news.buildNumber = 151248
      // news.semanticVersion = "0.4.2.0"
    } else {
      console.warn(`The file build number (${buildNumber}) is less than the news build number (${news.buildNumber})! (But we're ignoring this!)`)
    }
  }

  const json = `{\n  "version": {\n    "branch": "${BRANCH}",\n    "public": "${news.semanticVersion}",\n    "build": ${news.buildNumber}\n  }\n}`
  const filePath = path.join(paths.sourceData.root, "metadata.json");

  VERSION = news.buildNumber;
  SEMANTIC = news.semanticVersion;

  fs.writeFileSync(filePath, json);
  console.log("Wrote metadata.json to", filePath);
}

async function commitFiles() {
  if (!VERSION) {
    throw new Error("Version not defined, aborting commit");
  }

  if (!process.env.PAT) {
    throw new Error("No Personal Access Token defined. Define a .env file with PAT and the token!")
  }
  let additionalString  = ''
  if (process.env.EXPERIMENTAL) {
    additionalString = ' (Experimental)'
  }

  console.log(execSync(`cd ${paths.sourceData.root}; git add -A; \
      git commit -m "Build Version ${VERSION} (${SEMANTIC}) ${additionalString}"; \   
      git remote set-url origin https://${process.env.PAT}@github.com/SatisGraphtory/SourceData.git; \ 
      git push origin ${BRANCH}; git push;`).toString())
}