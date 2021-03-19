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
import {deserialize, serialize} from "class-transformer";
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

  // ** Get and write out buildings.json **/
  const buildableFiles = await getAllBuildableFilenames([...fileNameList]);

  const {collapsedObjectMap: buildableMap, slugToClassMap: buildingSlugMap, slugToFileMap: buildingSlugToFileMap } = await marshallSubclassGeneric<any>(pakFile,
    buildableFiles, docObjects, "AFGBuildable", false, false, true)

  const buildingClassMapMapPath = path.join(paths.dataWarehouse.main, 'BuildingClassMap.json');
  fs.writeFileSync(buildingClassMapMapPath, JSON.stringify(generateClassMap('AFGBuildable', new Set([...buildingSlugMap.values()])), replacer, 2))

  const buildingMapPath = path.join(paths.dataWarehouse.main, 'Buildings.json');
  fs.writeFileSync(buildingMapPath, JSON.stringify(buildableMap, replacer, 2))

  const buildingClassMapPath = path.join(paths.dataWarehouse.main, 'BuildingClasses.json');
  fs.writeFileSync(buildingClassMapPath, JSON.stringify(buildingSlugMap, replacer, 2))

  // This is the section handling schematics
  const schematicFiles = await getAllSchematicFilenames(fileNameList);

  const {collapsedObjectMap: schematicMap, dependencies: schematicDependencies, slugToClassMap: schematicSlugMap } = await marshallSubclassGeneric<UFGSchematic>(pakFile,
    schematicFiles, docObjects, "UFGSchematic", false, false, true)

  const schematicMapPath = path.join(paths.dataWarehouse.main, 'Schematics.json');
  fs.writeFileSync(schematicMapPath, JSON.stringify(schematicMap, replacer, 2))

  const schematicClassMapPath = path.join(paths.dataWarehouse.main, 'SchematicClasses.json');
  fs.writeFileSync(schematicClassMapPath, JSON.stringify(schematicSlugMap, replacer, 2))

  /** Get and write out recipes.json **/
  const recipeFiles = await getAllRecipeFilenames([...fileNameList, ...schematicDependencies]);

  const {collapsedObjectMap: recipeMap,  slugToClassMap: recipeSlugMap } = await marshallSubclassGeneric<UFGRecipe>(pakFile,
    recipeFiles, docObjects, "UFGRecipe", false, false, true)

  const recipeMapPath = path.join(paths.dataWarehouse.main, 'Recipes.json');
  fs.writeFileSync(recipeMapPath, JSON.stringify(recipeMap, replacer, 2))

  const recipeClassMapPath = path.join(paths.dataWarehouse.main, 'RecipeClasses.json');
  fs.writeFileSync(recipeClassMapPath, JSON.stringify(recipeSlugMap, replacer, 2))


  /** Get and write out items.json **/
  const itemFiles = await getAllItemFilenames([...fileNameList]);

  const {collapsedObjectMap: itemMap, dependencies: itemDependencies, slugToClassMap: itemSlugMap } = await marshallSubclassGeneric<UFGItemDescriptor>(pakFile,
    itemFiles, docObjects, "UFGItemDescriptor", false, false, true)

  const allImageFiles = (await pakFile.getFiles(itemDependencies)).filter(file => {
    return file.specialTypes.has('Texture2D')
  })


  const itemMapPath = path.join(paths.dataWarehouse.main, 'Items.json');
  fs.writeFileSync(itemMapPath, JSON.stringify(itemMap, replacer, 2))

  const itemClassMapPath = path.join(paths.dataWarehouse.main, 'ItemClasses.json');
  fs.writeFileSync(itemClassMapPath, JSON.stringify(itemSlugMap, replacer, 2))

  fs.mkdirSync(paths.dataWarehouse.images, { recursive: true });

  const {nameMap: imageNameMap, imageMap, indexFile} = await getAllImages(allImageFiles)

  const imageIndexPath = path.join(paths.dataWarehouse.images, 'index.ts');
  fs.writeFileSync(imageIndexPath, indexFile)

  const imageNameMapPath = path.join(paths.dataWarehouse.images, 'ImageNameMap.json');
  fs.writeFileSync(imageNameMapPath, JSON.stringify(imageNameMap, replacer, 2))

  let i = 0;
  let allEntries = [...imageMap.entries()]
  for (const [name, image] of allEntries) {
    const imagePath = path.join(paths.dataWarehouse.images, name + '.png');
    console.log("Writing " + i + '/' + allEntries.length + ' ' + imagePath)
    await image.toFile(imagePath);
    i++;
  }

  const pakTranslator = new PakTranslator();

  pakTranslator.addDefaultSource(buildableMap, ((mapEntry: any) => {
    return mapEntry?.mDisplayName?.sourceString
  }))

  pakTranslator.addDefaultSource(recipeMap, ((mapEntry: any) => {
    if (!mapEntry?.mDisplayNameOverride) {
      const firstItemSlug = mapEntry?.mProduct[0].ItemClass.slug;
      const normalItemPath = itemMap.get(firstItemSlug)?.mDisplayName?.sourceString
      if (normalItemPath) return normalItemPath;
      return buildableMap.get(firstItemSlug.replace(/^item-/, 'building-'))?.mDisplayName?.sourceString
    } else {
      return mapEntry?.mDisplayName?.sourceString;
    }
  }))

  pakTranslator.addDefaultSource(itemMap, ((mapEntry: any, mapKey: string) => {
    const normalItemPath = mapEntry?.mDisplayName?.sourceString;
    if (normalItemPath) return normalItemPath;
    return buildableMap.get(mapKey.replace(/^item-/, 'building-'))?.mDisplayName?.sourceString
  }))

  /** Write out translations.json  **/
  const translationPath = path.join(paths.dataWarehouse.translations, 'en.json');

  fs.mkdirSync(paths.dataWarehouse.translations, { recursive: true });

  fs.writeFileSync(translationPath, JSON.stringify(pakTranslator.translationMap, replacer, 2))

  const verifiedBuildableFiles = new Set([...buildingSlugToFileMap.values()]);


  // ====================================================================================
  /* The below section needs a LOT of help in terms of not hand jamming in the future. */
  // ************************************************************************************
  // We'll need to add gas and heat too


  const connectionMapper = new ConnectionMapper();

  // We need to add a custom handler to conveyor belts because they both report as 'input'
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

  const connectionSupportedResourceTypes = {
    1: {
      supportedResourceForms: [EResourceForm.RF_SOLID],
      enumType: EFactoryConnectionDirection,
      propertyField: "mDirection",
      unrealClassName: "UFGFactoryConnectionComponent",
      resourceType: 'AFGBuildableConveyorBelt'
    },
    2: {
      supportedResourceForms: [EResourceForm.RF_LIQUID, EResourceForm.RF_GAS],
      enumType: EPipeConnectionType,
      propertyField: "mPipeConnectionType",
      unrealClassName: "UFGPipeConnectionComponent",
      resourceType: 'AFGBuildablePipeline'
    },
  }

  for (const [resourceType, resourceEntry] of Object.entries(connectionSupportedResourceTypes)) {
    const {objectMap, slugToClassMap} = await marshallSubclassGeneric<any>(pakFile,
      verifiedBuildableFiles,
      docObjects,
      resourceEntry.unrealClassName, true)

    connectionMapper.addConnectionMap(slugToClassMap, objectMap, resourceEntry.propertyField,
      parseInt(resourceType, 10), resourceEntry.resourceType, resourceEntry.enumType);
  }

  /** Write out connections.json  **/
  const connectionMapPath = path.join(paths.dataWarehouse.main, 'Connections.json');

  fs.mkdirSync(paths.dataWarehouse.main, { recursive: true });

  fs.writeFileSync(connectionMapPath, connectionMapper.getFinalResourceMapString())

  /** Write out connections.json  **/
  const connectionResourceFormsMapPath = path.join(paths.dataWarehouse.main, 'ConnectionResourceForms.json')

  const simplifiedConnectionSupportedResourceTypes = {} as Record<string, number[]>;

  for (const [resourceType, resourceEntry] of Object.entries(connectionSupportedResourceTypes)) {
    simplifiedConnectionSupportedResourceTypes[resourceType] = resourceEntry.supportedResourceForms
  }

  fs.writeFileSync(connectionResourceFormsMapPath, JSON.stringify(simplifiedConnectionSupportedResourceTypes, null, 2))

  fs.mkdirSync(paths.dataWarehouse.enums, { recursive: true });

  /** Write out enums used for enums  **/
  const enumsPath = path.join(paths.dataWarehouse.enums, 'dataEnums.ts');

  const {text: enumText, numNew } = createEnumRevision(Object.values(connectionSupportedResourceTypes).map(item => item.resourceType));
  if (numNew) {
    fs.writeFileSync(enumsPath, enumText);
  }

  // ====================================================================================
  /* The above section needs a LOT of help in terms of not hand jamming in the future. */
  // ************************************************************************************
}


