// @ts-ignore
import { paths } from '@local/paths';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import * as TJS from 'typescript-json-schema';
parseAll();

function orderedObject (unordered: any) {
  return Object.keys(unordered).sort().reduce(
    (obj, key) => {
      obj[key] = unordered[key];
      return obj;
    },
    {} as Record<string, any>
  );
}

function replaceTopRef(schema: any) {
  if (schema["$ref"]) {
    const actualRef = schema["$ref"].replace("#/definitions/", "");
    for (const [key, val] of Object.entries(schema.definitions[actualRef])) {
      schema[key] = val;
    }

    delete schema["$ref"];
  }

  return JSON.stringify(orderedObject(schema), null, 2);
}

function parseAll(sourceDir = paths.dataLanding.interfaces, destDir = paths.dataLanding.json) {
  sourceDir = path.resolve(sourceDir);
  destDir = path.resolve(destDir);

  fs.rmdirSync(destDir, { recursive: true });

  const globExpression = `${sourceDir}/**/*.ts`;

  const nativeGlobExpression = `${sourceDir}/**/native/*.ts`;

  const settings: TJS.PartialArgs = {
    required: true,
  };

// optionally pass ts compiler options
  const compilerOptions: TJS.CompilerOptions = {
    refs: false,
  };


  const program = TJS.getProgramFromFiles(glob.sync(globExpression), compilerOptions)!;
  const generator = TJS.buildGenerator(program, settings)!;

  const filesByDir = new Map<string, string[]>();

  for (const header of glob.sync(globExpression)) {
    if (header.endsWith('/index.ts')) continue;
    if (header.includes('/native/')) continue;
    const portedPath = path.relative(sourceDir, header);

    const newFilePath = path.join(
      path.dirname(portedPath),
      path.basename(portedPath).replace(/\.ts$/g, '.json'),
    );


    const fullPath = path.join(destDir, newFilePath);
    if (!filesByDir.has(path.dirname(fullPath))) {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      filesByDir.set(path.dirname(fullPath), []);
    }
    filesByDir.get(path.dirname(fullPath))!.push(newFilePath);

    const schema = generator.getSchemaForSymbol(path.basename(portedPath).replace(/\.ts$/g, '')) as any;


    process.stderr.write(`\u001b[2Kconverting: ${fullPath}\r`);
    fs.writeFileSync(fullPath, replaceTopRef(schema));
  }

  for (const parentDir of filesByDir.keys()) {
    const children = filesByDir.get(parentDir)!;

    const indexLines = [];

    for (const child of children) {
      if (path.parse(child).name.includes('.')) {
        throw new Error('Filename has an illegal character: ' + child);
      }

      indexLines.push(
        `import ${path.parse(child).name} from './${path.basename(child)}';\nexport { ${path.parse(
          child,
        ).name} };`,
      );
    }

    fs.writeFileSync(path.join(parentDir, 'index.ts'), indexLines.join('\n'));
  }

  const nativeProgram = TJS.getProgramFromFiles(glob.sync(nativeGlobExpression), compilerOptions)!;
  const nativeGenerator = TJS.buildGenerator(nativeProgram, settings)!;

  const allSymbols = nativeGenerator.getMainFileSymbols(nativeProgram, glob.sync(nativeGlobExpression));

  const nativeDir = path.join(destDir, 'native');

  fs.mkdirSync(nativeDir, { recursive: true });

  const nativeIndexLines = [];

  for (const symbol of allSymbols) {
    const newPath = path.join(nativeDir, `${symbol}.json`);
    try {
      const schema = generator.getSchemaForSymbol(symbol);

      nativeIndexLines.push(
        `import ${path.parse(newPath).name} from './${path.basename(
          newPath,
        )}';\nexport { ${path.parse(newPath).name} };`,
      );

      process.stderr.write(`\u001b[2Kconverting: ${newPath}\r`);
      fs.writeFileSync(newPath, replaceTopRef(schema));
    } catch (e) {
      process.stderr.write(`\u001b[2Kfailure writing: ${newPath}\r`);
    }
  }

  fs.writeFileSync(path.join(nativeDir, 'index.ts'), nativeIndexLines.join('\n'));

  const allSubDirs = [...filesByDir.keys(), nativeDir];

  const relativeDirs = allSubDirs.map(dir => path.relative(destDir, dir));

  const masterIndexLines: string[] = [];

  relativeDirs.forEach(relDir => {
    masterIndexLines.push(`export * from './${relDir}';`);
  });

  fs.writeFileSync(path.join(destDir, 'index.ts'), masterIndexLines.join('\n'), 'utf-8');
}
