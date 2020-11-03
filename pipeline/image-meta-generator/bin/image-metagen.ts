#!/usr/bin/env node

import * as fp from 'lodash/fp';

let sanitizeFileName = (file: string) => {
  return file.replace(/[-./]/g, '_')
}

let noExt = (file: string) => file.slice(0, fp.lastIndexOf('.', file))

const stripIndex = (file: string) => {
  return file.replace(/\/index$/, '');
}

const removeExtraSpaces = (file: string) => {
  return file.replace(/\s/g, '');
}

const sanitizeName = fp.flow(noExt, stripIndex, sanitizeFileName, removeExtraSpaces)

const es6WithFileExtension = (files: string[]) => {
  return `${
    files.map(file => `import ${sanitizeName(file)} from './${file}'`).join('\n')
  }
export const manifest = [
${files.map(file => `  "${file}"`).join(',\n')}
];
  
const entries = {
  ${files.map(sanitizeName).join(',\n')}
};
export default entries;`
}

console.log(es6WithFileExtension(["SOME_TEST_FILE"]))