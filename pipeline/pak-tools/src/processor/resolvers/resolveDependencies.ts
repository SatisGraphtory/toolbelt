import {PakFile} from "../../pak/PakFile";

const cachedDependencySet = new Map<string, string>();

export function sanitizeDependencies(pakFile: PakFile, dependencies: Set<string>) {
  const entrySet = new Set(pakFile.entries.keys());
  if (!cachedDependencySet.size) {
    console.log("Populating dependency")
    for (const key of pakFile.entries.keys()) {
      // We must store all variations (with ext or not) of the dependencies, otherwise we run into some big issues
      cachedDependencySet.set(key.toLowerCase(), key);
      cachedDependencySet.set(
        key
          .split('.')
          .slice(0, -1)
          .join('.')
          .toLowerCase(),
        key,
      );
    }
  }

  return new Set(
    [...dependencies]
      .map(inputStrRaw => {
        // We need to remove the className if it exists
        const cleanedEntryString = inputStrRaw.split('.').slice(0, 1)[0];

        if (entrySet.has(cleanedEntryString)) {
          return cleanedEntryString;
        }

        return cachedDependencySet.get(cleanedEntryString.toLowerCase()) ||
          cachedDependencySet.get(inputStrRaw.toLowerCase());
      })
      .filter(item => item) as string[],
  );
}