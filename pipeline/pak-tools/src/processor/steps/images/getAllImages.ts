import sharp from "sharp";
import {UObject} from "../../../pak/pakfile/UObject";
import {toKebabCase} from "../../resolvers/resolveSlugs";

export async function getAllImages(objectFiles: UObject[]) {
  const possibleResolutions = ['_64', '_256', '_512'];
  const imageDatabase = new Map<string, sharp.Sharp>();

  const resolutionRegexes = possibleResolutions.map(resolution => new RegExp('(.*)' + resolution + '(.*)'));

  const imageResolutionMaps = new Map<string, any[]>();
  const reverseFilenameMap = new Map<string, string>();

  let i = 0;

  for (const file of objectFiles) {
    let actualImageName = undefined;

    for (const regex of resolutionRegexes) {
      if (regex.exec(file.uasset.filename)) {
        const match = regex.exec(file.uasset.filename);
        actualImageName = match![1] + '####' + match![2]

        const filenameParts = actualImageName.split('/');
        const actualNameParts = filenameParts.pop()!.split('.')
        actualNameParts.pop();
        actualImageName = actualNameParts.join('.')
        break;
      }
    }

    if (actualImageName === undefined) {
      let pathParts = file.uasset.filename.split('.');
      pathParts.pop()!;
      actualImageName = [pathParts.join('.') + '####'].join('.');
      const actualNameParts = actualImageName.split('/');
      actualImageName = actualNameParts.pop()!
    }

    if (/^[0-9]/.test(actualImageName)) {
      actualImageName = 'Image_' + actualImageName
    }

    let slugName = file.uasset.filename;

    const fileNameList = slugName.split('.');
    fileNameList.pop();
    const nameRetrieval = fileNameList.join('.').split('/');

    slugName = `image-${toKebabCase(nameRetrieval.pop()!)}`

    // Always refer to the 256 version
    reverseFilenameMap.set(slugName, actualImageName.replace('####', ''));

    if (!imageResolutionMaps.has(actualImageName)) {
      imageResolutionMaps.set(actualImageName, [])
    }

    const imageList = imageResolutionMaps.get(actualImageName)!
    for (const exp of file.specialTypes.get('Texture2D')!) {
      imageList.push(exp.getImage());
    }
    console.log("Consolidating image " + i++ + '/' + objectFiles.length);
  }

  i = 0;
  for (const filename of imageResolutionMaps.keys()) {
    const textureFiles = imageResolutionMaps.get(filename)!;
    const largestImageSize = Math.max(...textureFiles.map(item => item?.x || -1));
    const largestImage = textureFiles.filter(file => file!.x === largestImageSize)[0]!;

    const image = sharp(largestImage.data);
    imageDatabase.set(filename, image);
    console.log("Filtering image " + i++ + '/' + imageResolutionMaps.size);
  }

  const finalImageMap = new Map<string, sharp.Sharp>();

  const totalSteps = imageDatabase.size * 2;

  i = 0;
  for (const imageName of imageDatabase.keys()) {
    for (const resolution of [64, 256]) {
      const properImageName = imageName.replace('####', '') + '.' + resolution
      const imageData = imageDatabase.get(imageName)!;
      const clonedImage = imageData.clone().resize(resolution, resolution, {fit: 'cover'});
      finalImageMap.set(properImageName, clonedImage.png({
        // We get a decent amount (~5%) of additional compression from this.
        adaptiveFiltering: true,
      }))
      console.log("Resizing image " + i++ + '/' + totalSteps);
    }
  }

  const imports = [...finalImageMap.keys()].map(item => `import ${item.replace(/\./g, '_')} from './${item}.png'`).join('\n')
  const manifest = `export const manifest = [
${[...finalImageMap.keys()].map(item => `\t"${item}.png"`).join(',\n')}]`
  const exportedEntries = `const entries = {
${[...finalImageMap.keys()].map(item => `\t${item.replace(/\./g, '_')}`).join(',\n')}\n}\n\nexport default entries;`
  return {
    imageMap: finalImageMap,
    nameMap: reverseFilenameMap,
    indexFile: `${imports}\n\n${manifest}\n\n${exportedEntries}\n`
  }
}