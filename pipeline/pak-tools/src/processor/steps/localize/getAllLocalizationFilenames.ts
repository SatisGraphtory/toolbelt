async function getAllLocalizationFilenames(pakEntries: string[]) {
  const localizationFiles = new Set<string>();
  for (const file of pakEntries) {
    if (file.match(/\/Localization\/.*Game.locres/g)) {
      localizationFiles.add(file);
    }
  }

  return localizationFiles;
}

export default getAllLocalizationFilenames;