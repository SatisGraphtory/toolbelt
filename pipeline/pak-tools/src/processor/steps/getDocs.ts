// @ts-ignore
import {paths} from '@local/paths';
import fs from "fs";
import * as path from 'path';

async function getDocs(docPath = paths.sourceData.docs) {
  const docText = await fs.readFileSync(path.join(docPath, 'Docs.json'), 'utf16le')

  const cleanedString = docText
    .replace(/\uFFFD/g, "");

  console.log(docText.slice(0, 100))
  console.log(cleanedString.slice(0, 100))

  return Promise.resolve(JSON.parse(cleanedString));
}

export default getDocs;