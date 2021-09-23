// @ts-ignore
import {paths} from '@local/paths';
import fs from "fs";
import * as path from 'path';
import * as SatisfactoryEnums from '../../../../../../.DataLanding/interfaces';
import {findJsonObject, getJsonForObject} from "../../loader/jsonLoader";
import {PakFile} from "../../../pak/PakFile";
import {Marshaller} from "../../marshaller/marshaller";

function cleanString(input: string) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 255) {
      output += input.charAt(i);
    }
  }

  return output;
}

//
function cleanNativeClassName(name: string) {
  return name.match(/Class'\/Script\/FactoryGame\.([A-Za-z]+)'/)![1];
}

//
// function cleanClassInternalName(name: string) {
//   const regex = /((Build)|(Desc)|(ResourceSink)|(Schematic)|(Research)|(Recipe)|(BP)|(Equip))_([A-Za-z_\-0-9]+)_C/;
//   const matches = name.match(regex);
//   if (!matches) {
//     throw new Error(`Cannot clean classInternalName: ${name}`)
//   }
//   // const type = matches[1];
//   // const innerName = matches[10];
//   return matches[0];
// }

const enumMap = new Map<string, number>();

for (const [enumName, enumValues] of Object.entries(SatisfactoryEnums)) {
  const allEnumValues = Object.values(enumValues).filter((item: any) => typeof item !== 'number');
  for (const enm of allEnumValues) {
    // if (enumMap.has(enm)) {
    //   throw new Error("Already has enum " + enm);
    // }
    enumMap.set(enm as any, (enumValues as any)[enm as any] as unknown as number);
  }
}

async function resolvePropertyValue(propertyValue: any, pakFile: PakFile, parsedRef: any = null): Promise<any> {

  // Null string;
  if (!propertyValue) return null;

  if (Array.isArray(propertyValue)) {
    if (propertyValue.length > 0) {
      const returnedValueMap = [];
      for (const item of propertyValue) {
        returnedValueMap.push(await resolvePropertyValue(item, pakFile, parsedRef?.items ? parsedRef.items : null))
      }
    }

    return propertyValue;
  } else if (typeof propertyValue === 'object') {
    const resultObject = new Map<string, any>();
    for (const [key, entry] of Object.entries(propertyValue)) {
      resultObject.set(key, await resolvePropertyValue(entry, pakFile, parsedRef));
    }

    return resultObject;
  } else if (typeof propertyValue === 'string') {
    // Number parsers
    if (/^-?\d+$/.test(propertyValue)) {
      // Int value
      return parseInt(propertyValue, 10)
    } else if (/^-?\d+\.\d+$/.test(propertyValue)) {
      // Float value
      return parseFloat(propertyValue)
    } else if (/^((True)|(False))$/.test(propertyValue)) {
      // Boolean
      return propertyValue.match(/^((True)|(False))$/)![1] === 'True'
    } else if (enumMap.has(propertyValue)) {
      // Has  an enum assigned to it
      // return enumMap.get(propertyValue)!
      // Return the string value of the enum for now
      if (parsedRef) {
        const enumType = parsedRef['$ref'].replace(/#\/definitions\//, '');
        const checkedEnumMap = (SatisfactoryEnums as any)[enumType];
        if (checkedEnumMap === undefined || checkedEnumMap[propertyValue] === undefined) {
          // Sadness
          // throw new Error("Undefined enum found: " + propertyValue);
          return enumMap.get(propertyValue)!;
        }
        return checkedEnumMap[propertyValue];
      }

      return enumMap.get(propertyValue)!;
    } else if (/^[\w\s]+/.test(propertyValue)) {
      // Simple string property value
      if (propertyValue.startsWith("BlueprintGenerated")) {
        const cleanedString = propertyValue.replace(/^BlueprintGeneratedClass\s+/, '');

        const marshaller = new Marshaller(pakFile);

        return await marshaller.marshalSoftClassReferenceString(cleanedString);
      }

      return propertyValue;
    } else if (/^\(.*\)$/.test(propertyValue)) {
      if (propertyValue === "(None)") {
        return {};
      }

      // Complex tokenizer
      const tokenizedInput = tokenize(propertyValue);
      if (tokenizedInput.remainingString === '') {
        return tokenizedInput.token;
      } else {
        throw new Error("Could not tokenize remaining items: " + tokenizedInput)
      }
    } else {
      console.log("It's a string literal")
      return propertyValue
      // console.log(propertyValue);
      // throw new Error("Unknown property type");
    }
  } else {
    console.log(typeof propertyValue, propertyValue)
    throw new Error("Unknown type of property");
  }
}

function tokenize(input: string): { remainingString: string, charactersRead: number, token: any } {
  if (!input.startsWith('(')) {
    throw new Error("Started tokenizing with " + input);
  }

  let readChars = 0;

  const innerInput = input.slice(1);
  if (innerInput.startsWith('(')) {
    let tokenizedRemainingString = innerInput;
    let totalCharactersRead = 0;
    const allTokens = [];

    while (!tokenizedRemainingString.startsWith(')')) {
      const {remainingString, charactersRead, token} = tokenize(tokenizedRemainingString);
      totalCharactersRead += charactersRead;
      tokenizedRemainingString = remainingString;

      allTokens.push(token);

      while (/^[ ,]/.test(tokenizedRemainingString)) {
        totalCharactersRead += 1;
        tokenizedRemainingString = tokenizedRemainingString.slice(1);
      }
    }

    totalCharactersRead++;
    tokenizedRemainingString = tokenizedRemainingString.slice(1);

    return {
      remainingString: tokenizedRemainingString,
      charactersRead: totalCharactersRead,
      token: allTokens
    }
  } else {
    let key = null;
    let value = null;
    let foundKey = false;
    let iterativeInput = innerInput;
    let map = new Map<any, any>();
    let list = [] as any[];
    let useList = false;

    while (iterativeInput) {
      if (foundKey) {
        if (iterativeInput.startsWith('(')) {
          const {remainingString, charactersRead, token} = tokenize(iterativeInput);

          value = token;
          iterativeInput = remainingString;
          readChars += charactersRead;

          foundKey = false;
        } else if (iterativeInput.startsWith('NSLOCTEXT')) {
          iterativeInput = iterativeInput.slice('NSLOCTEXT'.length)
          readChars += 'NSLOCTEXT'.length;

          let matcherSafeguard = '';

          while (!iterativeInput.startsWith(')')) {
            matcherSafeguard += iterativeInput.slice(0, 1);
            iterativeInput = iterativeInput.slice(1);
          }

          // Remove trailing )
          iterativeInput = iterativeInput.slice(1);

          const match = matcherSafeguard.match(/^\("(\[[A-Z0-9]+])", "([A-Z0-9]+)", "(.+)"/);

          if (!match) {
            throw new Error("Does not match: " + matcherSafeguard)
          }

          value = {
            namespace: JSON.parse(match[1]
              .replace(" ", "")
              .replace("[", "[\"")
              .replace("]", "\"]")
              .replace(",", "\",\"")),
            key: match[2],
            sourceString: match[3]
          };

          readChars += matcherSafeguard.length + 1;

          foundKey = false;
        } else if (/^-?[0-9.]+/.test(iterativeInput)) {
          value = iterativeInput.match(/^(-?[0-9.]+)/)![1];
          iterativeInput = iterativeInput.slice(value.length);
          readChars += value.length;

          value = parseFloat(value);
          foundKey = false;
        } else if (/^-?[0-9]+/.test(iterativeInput)) {
          value = iterativeInput.match(/^(-?[0-9]+)/)![1];
          iterativeInput = iterativeInput.slice(value.length);
          readChars += value.length;
          value = parseInt(value, 10);
          foundKey = false;
        } else if (/^BlueprintGeneratedClass/.test(iterativeInput)) {
          const match = iterativeInput.match(/^BlueprintGeneratedClass'"\/Game\/FactoryGame([A-Za-z\/_0-9\-]+)\.([A-Za-z_0-9.\-]+)"'/);
          if (!match) throw new Error("No match for " + iterativeInput);
          value = match[2];
          iterativeInput = iterativeInput.slice(match[0].length);
          readChars += match[0].length;

          foundKey = false;
        } else if (/^\/Game\/FactoryGame/.test(iterativeInput)) {
          const match = iterativeInput.match(/^\/Game\/FactoryGame([A-Za-z\/_0-9\-]+)\.([A-Za-z_0-9.\-]+)/);
          if (!match) throw new Error("No match for " + iterativeInput);
          value = match[2];
          iterativeInput = iterativeInput.slice(match[0].length);
          readChars += match[0].length;

          foundKey = false;
        } else if (/^\/Script\/FactoryGame/.test(iterativeInput)) {
          const match = iterativeInput.match(/^\/Script\/FactoryGame\.([A-Za-z_0-9.\-]+)/);
          if (!match) throw new Error("No match for " + iterativeInput);
          value = match[1];
          iterativeInput = iterativeInput.slice(match[0].length);
          readChars += match[0].length;

          foundKey = false;
        } else if (/^[A-Za-z0-9_]+'"\/((Game)|(Script))\/FactoryGame(([A-Za-z\/_0-9\-]+)\.)?([A-Za-z_0-9.\-]+):([A-Za-z_0-9.\-]+)"'/.test(iterativeInput)) {

          // weird generic template type with variable at the end
          const match = iterativeInput.match(/^[A-Za-z0-9_]+'"\/((Game)|(Script))\/FactoryGame(([A-Za-z\/_0-9\-]+)\.)?([A-Za-z_0-9.\-]+):([A-Za-z_0-9.\-]+)"'/);
          if (!match) throw new Error("No match for " + iterativeInput);
          value = match[7];
          // match[4/5] is like 	/Buildable/Factory/Train/Station/Build_TrainDockingStation.
          // match[6] is like Default__Build_TrainDockingStation_C
          // match[7] is like PlatformConnection0
          iterativeInput = iterativeInput.slice(match[0].length);
          readChars += match[0].length;

          foundKey = false;
        } else if (/^[A-Za-z0-9_]+'"\/((Game)|(Script))\/FactoryGame(([A-Za-z\/_0-9\-]+)\.)?([A-Za-z_0-9.\-]+)"'/.test(iterativeInput)) {

          // weird generic template type
          const match = iterativeInput.match(/^[A-Za-z0-9_]+'"\/((Game)|(Script))\/FactoryGame(([A-Za-z\/_0-9\-]+)\.)?([A-Za-z_0-9.\-]+)"'/);
          if (!match) throw new Error("No match for " + iterativeInput);
          value = match[6];
          iterativeInput = iterativeInput.slice(match[0].length);
          readChars += match[0].length;

          foundKey = false;
        } else if (/^"([A-Za-z_0-9 ]+)"/.test(iterativeInput)) {

          // weird quoted text
          const match = iterativeInput.match(/^"([A-Za-z_0-9 ]+)"/);
          if (!match) throw new Error("No match for " + iterativeInput);
          value = match[1];
          iterativeInput = iterativeInput.slice(match[0].length);
          readChars += match[0].length;

          foundKey = false;
        } else if (/^((True)|(False))/.test(iterativeInput)) {

          // Boolean
          const match = iterativeInput.match(/^((True)|(False))/);
          if (!match) throw new Error("No match for " + iterativeInput);
          value = match[1];
          iterativeInput = iterativeInput.slice(match[0].length);
          readChars += match[0].length;
          value = value === 'True'
          foundKey = false;
        } else {
          const match = iterativeInput.match(/^([A-Za-z0-9_]+)/);
          if (!match) {
            throw new Error("Could not find match for value:" + iterativeInput)
          }

          const matchedString = match[1];
          if (!enumMap.has(matchedString)) {
            // throw new Error("Is not an enum: " + iterativeInput)
            // Treat as literal
            value = matchedString
            iterativeInput = iterativeInput.slice(match[0].length);
            readChars += match[0].length;

            foundKey = false;
          }  else {
            value = enumMap.get(matchedString)!
            iterativeInput = iterativeInput.slice(match[0].length);
            readChars += match[0].length;

            foundKey = false;
          }
        }
      } else {
        if (/^[A-Za-z_0-9]+=/.test(iterativeInput)) {
          key = iterativeInput.match(/^([A-Za-z_0-9]+)=/)![1];
          foundKey = true;
          iterativeInput = iterativeInput.slice(key.length + 1);
          readChars += key.length + 1;
        } else if (iterativeInput.startsWith(',')) {
          if (key !== null && value !== null) {
            map.set(key, value);
            key = null;
            value = null
            iterativeInput = iterativeInput.slice(1);
            readChars += 1;

            if (list.length > 0) {
              throw new Error("Cannot use both math and list");
            }
          } else if (value !== null) {
            useList = true;
            list.push(value);
            value = null
            iterativeInput = iterativeInput.slice(1);
            readChars += 1;

            if (map.size > 0) {
              throw new Error("Cannot use both math and list");
            }
          } else {
            throw new Error("AAAAAA" + iterativeInput)
          }
        } else if (iterativeInput.startsWith(')')) {
          if (key !== null && value !== null) {
            map.set(key, value);
            key = null;
            value = null
            iterativeInput = iterativeInput.slice(1);
            readChars += 1;

            if (list.length > 0) {
              throw new Error("Cannot use both math and list");
            }
            break;
          } else if (value !== null) {
            useList = true;
            list.push(value);
            value = null
            iterativeInput = iterativeInput.slice(1);
            readChars += 1;

            if (map.size > 0) {
              throw new Error("Cannot use both math and list");
            }
            break;
          } else {
            // This is the case where it's just ()
            iterativeInput = iterativeInput.slice(1);
            readChars += 1;
            break;
          }
        } else {
          // Hack to only use lists
          foundKey = true
        }
      }
    }

    return {
      remainingString: iterativeInput,
      charactersRead: readChars,
      token: useList ? list : map
    };
  }
}

async function getDocs(pakFile: PakFile, docPath = paths.sourceData.docs,) {
  const docText = await fs.readFileSync(path.join(docPath, 'Docs.json'), 'utf16le')

  const cleanedString = cleanString(docText);

  const jsonTree = JSON.parse(cleanedString);

  const marshalledDoc = {} as Record<string, Record<string, Record<string, any>>>;

  for (const entry of jsonTree) {
    // TODO: use this to determine defaults eventually

    const marshalledEntries = {} as Record<string, Record<string, any>>;
    const nativeClassName = cleanNativeClassName(entry.NativeClass)
    marshalledDoc[nativeClassName] = marshalledEntries;

    const jsonModel = getJsonForObject(findJsonObject(nativeClassName)!);

    for (const item of entry.Classes) {
      const classEntry = {} as Record<string, any>;
      marshalledEntries[item.ClassName] = classEntry;
      for (const [propertyName, propertyValue] of Object.entries(item)) {
        if (propertyName === 'ClassName') {
          continue;
        }
        let parsedRef = null;

        if (jsonModel.properties[propertyName] &&
          jsonModel.properties[propertyName]['$ref']) {
          parsedRef = jsonModel.properties[propertyName];
        } else if (jsonModel.properties[propertyName]?.items &&
          jsonModel.properties[propertyName].items['$ref']) {
          parsedRef = jsonModel.properties[propertyName];
        }

        let resolvedPropertyValue = await resolvePropertyValue(propertyValue, pakFile, parsedRef);

        while (resolvedPropertyValue?.token !== undefined) {
          resolvedPropertyValue = resolvedPropertyValue.token
        }

        classEntry[propertyName] = resolvedPropertyValue;
      }
    }
  }

  return Promise.resolve(marshalledDoc);
}

export default getDocs;