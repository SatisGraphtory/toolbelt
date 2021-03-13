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
import getAllSchematicFilenames from "../src/processor/steps/schematics/getAllSchematicFilenames";
import getDocs from "../src/processor/steps/docs/getDocs";
import {resolveExports, unresolvedExports} from "../src/processor/resolvers/resolveExports";
import getAllRecipeFilenames from "../src/processor/steps/recipes/getAllRecipeFilenames";
import consoleInspect from "../src/util/consoleInspect";
import path from "path";
import {EmitContext} from "../../headers-to-interfaces/emit";
import {pretty} from "../src/util/pretty";

// import RecipeJson from "../../../.DataLanding/objects/recipes";
import { UFGRecipe, UFGSchematic, UFGItemDescriptor, UFGPipeConnectionComponent, EResourceForm, EFactoryConnectionDirection, EPipeConnectionType } from '../../../.DataLanding/interfaces';

import * as SatisFactoryClassInterfaces from '../../../.DataLanding/interfaces';

import {marshallGeneric} from "../src/processor/marshaller/genericMarshaller";
import getAllItemFilenames from "../src/processor/steps/items/getAllItemFilenames";
import {guessSubclassesFromJsonClassName} from "../src/processor/steps/json/guessSubclassesFromJsonClassName";
import getAllBuildableFilenames from "../src/processor/steps/buildables/getAllBuildableFilenames";
import ConnectionMapper from "../src/processor/steps/ConnectionMapper";
import getAllLocalizationFilenames from "../src/processor/steps/localize/getAllLocalizationFilenames";

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

  const parsedDocPath = path.join(paths.dataWarehouse.supplimentary, 'ParsedDocs.json');

  fs.mkdirSync(paths.dataWarehouse.supplimentary, { recursive: true });

  // const fileNameList = ['FactoryGame/Content/FactoryGame/Schematics/Tutorial/Schematic_Tutorial5.uexp']
  const fileNameList =  Array.from(pakFile.entries.keys());

  // const localizationFiles = await getAllLocalizationFilenames(fileNameList)
  //
  // for (const localizationFile of localizationFiles) {
  //   if (localizationFile.indexOf('/en-US-POSIX') !== -1) {
  //     console.log(localizationFile, await pakFile.getLocalizationFile(localizationFile));
  //   }
  // }

  function replacer(key: string, value: any) {
    if(value instanceof Map) {
        return Object.fromEntries(value)
    } else if ( typeof value === 'bigint') {
      return Number(value)
    } else {
      return value;
    }
  }

  fs.writeFileSync(parsedDocPath, JSON.stringify(docObjects, replacer, 2))

  const pakManifestPath = path.join(paths.dataWarehouse.supplimentary, 'PakEntries.json');

  fs.writeFileSync(pakManifestPath, JSON.stringify([...pakFile.entries.keys()], replacer, 2))

  if (false) {
    // This is the section handling schematics
    const schematicFiles = await getAllSchematicFilenames(fileNameList);

    const {objectMap: schematicMap, dependencies: schematicDependencies } = await marshallGeneric<UFGSchematic>(pakFile,
      schematicFiles, docObjects, "FGSchematic", "UFGSchematic")

    const recipeFiles = await getAllRecipeFilenames([...fileNameList, ...schematicDependencies]);

    const {objectMap: recipeMap, dependencies: recipeDependencies } = await marshallGeneric<UFGRecipe>(pakFile,
      recipeFiles, docObjects, "FGRecipe", "UFGRecipe")

    const itemFiles = await getAllItemFilenames([...fileNameList]);

    const {objectMap: itemMap, dependencies: itemDependencies } = await marshallGeneric<UFGItemDescriptor>(pakFile,
      itemFiles, docObjects, "FGItemDescriptor", "UFGItemDescriptor")
  }

  const buildableFiles = await getAllBuildableFilenames([...fileNameList]);

  const classes = new Set(guessSubclassesFromJsonClassName("AFGBuildable"));

  const globalClassMap = {} as Record<string, string[]>;

  const verifiedBuildableFiles = [] as string[];

  const allBuildingsMap = new Map<string, any>();

  for (const unrealName of classes) {
    console.log("Processing buildable", unrealName);
    const docName = unrealName.replace(/^A/, '');
    const { objectMap: buildableMap, dependencies: buildableDependencies, slugMap } = await marshallGeneric<any>(pakFile,
      buildableFiles, docObjects, docName, unrealName)
    const buildableClassKeys =  [...buildableMap.keys()];
    if (buildableClassKeys.length) {
      globalClassMap[unrealName] = buildableClassKeys;
      verifiedBuildableFiles.push(...buildableClassKeys);
      for (const key of buildableClassKeys) {
        const slug = slugMap.get(key)!;
        if (buildableMap.get(key)?.length !== 1) {
          throw new Error("Too many entries for " + key)
        }

        allBuildingsMap.set(slug, buildableMap.get(key)![0])
      }
    }
  }

  const classMapPath = path.join(paths.dataWarehouse.supplimentary, 'ClassMap.json');

  fs.writeFileSync(classMapPath, JSON.stringify(globalClassMap, replacer, 2))

  const {objectMap: pipeMap, classToFilenameMap: pipeFilenameMap,
    dependencies: pipeDependencies, slugMap: pipeSlugMap } = await marshallGeneric<any>(pakFile,
    new Set(verifiedBuildableFiles),
    docObjects, "FGPipeConnectionComponent",
    "UFGPipeConnectionComponent", true)

  const {objectMap: beltMap, classToFilenameMap: beltFilenameMap,
    dependencies: beltDependencies, slugMap: beltSlugMap } = await marshallGeneric<any>(pakFile,
    new Set(verifiedBuildableFiles),
    docObjects, "FGFactoryConnectionComponent",
    "UFGFactoryConnectionComponent", true)

  const connectionMapper = new ConnectionMapper();

  // We need to add a custom handler to conveyer belts because they both report as 'input'
  connectionMapper.addCustomClassHandler('FGBuildableConveyorBelt', () => {
    return [
      {
        mDirection: EFactoryConnectionDirection.FCD_INPUT
      },
      {
        mDirection: EFactoryConnectionDirection.FCD_OUTPUT
      }
    ]
  })

  // We'll need to add gas and heat too
  connectionMapper.addConnectionMap(beltSlugMap, beltFilenameMap, beltMap, "mDirection",
    EResourceForm.RF_SOLID, EResourceForm, EFactoryConnectionDirection);
  connectionMapper.addConnectionMap(pipeSlugMap, pipeFilenameMap, pipeMap, "mPipeConnectionType",
    EResourceForm.RF_LIQUID, EResourceForm, EPipeConnectionType);


  /** Write out connections.json  **/
  const connectionMapPath = path.join(paths.dataWarehouse.main, 'Connections.json');

  fs.mkdirSync(paths.dataWarehouse.main, { recursive: true });

  fs.writeFileSync(connectionMapPath, connectionMapper.getFinalResourceMapString())

  /** Write out buildings.json  **/
  const buildingMapPath = path.join(paths.dataWarehouse.main, 'Buildings.json');

  fs.writeFileSync(buildingMapPath, JSON.stringify(allBuildingsMap, replacer, 2))
}


