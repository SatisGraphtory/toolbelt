async function getAllItemFilenames(pakEntries: string[]) {
  const itemFiles = new Set<string>();
  for (const file of pakEntries) {
    if (file.match(/\/Resource\/.*\.uexp/g)) {
      itemFiles.add(file);
    } else if(file.match(/\/Events\/?.*\/Desc_.*\.uexp/g)) {
      itemFiles.add(file);
    }
  }

  return itemFiles;
}

export default getAllItemFilenames;