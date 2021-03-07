async function getAllRecipeFilenames(pakEntries: string[]) {
  const recipeFiles = new Set<string>();
  for (const file of pakEntries) {
    if (file.match(/\/Recipes\/.*Recipe_[A-Za-z_0-9]+\.uexp/g)) {
      recipeFiles.add(file);
    }
  }

  return recipeFiles;
}

export default getAllRecipeFilenames;