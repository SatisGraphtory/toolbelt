async function getAllBuildableFilenames(pakEntries: string[]) {
  const buildableFiles = new Set<string>();
  for (const file of pakEntries) {
    if (file.match(/\/Buildable\/?.*\/Build_.*\.uexp/g)) {
      buildableFiles.add(file);
    } else if (file.match(/\/Events\/?.*\/Build_.*\.uexp/g)) {
      buildableFiles.add(file);
    }
  }

  return buildableFiles;
}

export default getAllBuildableFilenames;