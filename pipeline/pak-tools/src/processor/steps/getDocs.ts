// @ts-ignore
import {paths} from '@local/paths';
import fs from "fs";
import * as path from 'path';
import * as SatisfactoryEnums from '../../../../../.DataLanding/interfaces/enums';

function cleanString(input: string) {
  let output = "";
  for (let i = 0; i<input.length; i++) {
    if (input.charCodeAt(i) <= 255) {
      output += input.charAt(i);
    }
  }

  return output;
}

function cleanNativeClassName(name: string) {
  return name.match(/Class'\/Script\/FactoryGame\.([A-Za-z]+)'/)![1];
}

function cleanClassInternalName(name: string) {
  const regex = /((Build)|(Desc)|(ResourceSink)|(Schematic)|(Research)|(Recipe)|(BP)|(Equip))_([A-Za-z_\-0-9]+)_C/;
  const matches = name.match(regex);
  if (!matches) {
    throw new Error(`Cannot clean classInternalName: ${name}`)
  }
  // const type = matches[1];
  // const innerName = matches[10];
  return matches[0];
}

const classNamesMap = new Map<string, any>();
const instanceValues = new Map<string, Map<string, any>>();

function findAllEnumNames() {

}

const enumMap = new Map<string, any>();

for (const [enumName, enumValues] of Object.entries(SatisfactoryEnums)) {
  // const allEnumValues = (enumValues as any).filter((item: any) => typeof item !== 'number');
  console.log(enumValues);
}
// console.log(Object.values(SatisfactoryEnums['EMultipleUnitControl']));

function resolvePropertyValue(propertyValue: string) {

  console.log(propertyValue)
}

async function getDocs(docPath = paths.sourceData.docs) {
  const docText = await fs.readFileSync(path.join(docPath, 'Docs.json'), 'utf16le')

  const cleanedString = cleanString(docText);

  const jsonTree = JSON.parse(cleanedString);

  for (const entry of jsonTree) {
    cleanNativeClassName(entry.NativeClass);
    entry.Classes.map((item: any) => {
      for (const [propertyName, propertyValue] of Object.entries(item)) {
        resolvePropertyValue(propertyValue as string);
      }
    })
  }

  return Promise.resolve("");
}

export default getDocs;