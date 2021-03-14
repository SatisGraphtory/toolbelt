async function getAllSchematicFilenames(pakEntries: string[]) {
  const schematicFiles = new Set<string>();
  for (const file of pakEntries) {
    if (file.match(/\/Schematics\/.*\.uexp/g)) {
      const fileNameList = file.split('.');
      fileNameList.pop();
      schematicFiles.add(fileNameList.join('.'));
    } else if (file.match(/\/Schematic_.*\.uexp/g)) {
      const fileNameList = file.split('.');
      fileNameList.pop();
      schematicFiles.add(fileNameList.join('.'));
    }
  }

  return schematicFiles;
}

export default getAllSchematicFilenames;