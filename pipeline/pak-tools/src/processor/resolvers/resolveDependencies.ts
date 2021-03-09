import {PakFile} from "../../pak/PakFile";

const cachedDependencySet = new Map<string, string>();
const allSeenFiles = new Set<string>();
const entrySet = new Set<string>();

function populateCache(pakFile: PakFile) {
  for (const entry of pakFile.entries.keys()) {
    entrySet.add(entry);
  }

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

    const filename = key.split('/').pop()!
    const baseFilename = filename.split('.').slice(0, -1).join('.');
    allSeenFiles.add(baseFilename)
  }
}

export function dependencyExists(pakFile: PakFile, dependency: string) {
  if (!cachedDependencySet.size) {
    console.log("Populating dependencies...")
    populateCache(pakFile);
  }

  return allSeenFiles.has(dependency) || allSeenFiles.has(dependency.replace(/_C$/, ''));
}

export function sanitizeDependencies(pakFile: PakFile, dependencies: Set<string>) {
  if (!cachedDependencySet.size) {
    console.log("Populating dependencies...")
    populateCache(pakFile);
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