import {PakFile} from "../../../pak/PakFile";
import {UObject} from "../../../pak/pakfile/UObject";


async function getSchematics(pakFile: PakFile, schematicFiles: string[]) {
  const schematicEntriesRaw = (await pakFile.getFiles(schematicFiles)).filter(item => {
    return item instanceof UObject;
  }) as UObject[];

  return schematicEntriesRaw;
}

export default getSchematics;