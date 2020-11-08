async function getAllSchematicFilenames(pakEntries: string[]) {

  const schematicFiles = new Set<string>();
  for (const file of pakEntries) {
    if (file.match(/\/Schematics\/.*\.uexp/g)) {
      schematicFiles.add(file);
    }
  }
}

export default getAllSchematicFilenames;