import {getJsonForObject} from "../../loader/jsonLoader";
import * as JSONFiles from '../../../../../../.DataLanding/json';

export function guessSubclassesFromJsonClassName(mainClass: string) {
  const mainJson = getJsonForObject(mainClass).required

  const subclassNames = [] as string[];

  for (const [key, entry] of Object.entries(JSONFiles)) {
    const entryKeySet = new Set((entry as any).required)
    if (mainJson.every((key: any) => entryKeySet.has(key))) {
      subclassNames.push(key);
    }
  }

  return subclassNames;
}