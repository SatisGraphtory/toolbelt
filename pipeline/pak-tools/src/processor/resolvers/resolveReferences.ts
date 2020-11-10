
function resolveReferenceName(baseObject: UObject, blueprintName: string) {
  const imports = baseObject.uasset.imports.filter(imp => imp.objectName === blueprintName || imp.className === blueprintName);
  if (imports.length === 0) {
    console.log('Might want to check this, this might actually be className instead? ' + blueprintName);
    console.log(baseObject.uasset.imports.filter(imp => imp.className === blueprintName));
    console.log(baseObject.uasset.filename);
    throw new Error('No imports');
  }

  let correctImport = imports[0];

  if (imports.length > 1) {
    const furtherFiltered = imports.filter(imp => imp.className === blueprintName);
    if (furtherFiltered.length === 1) {
      correctImport = furtherFiltered[0];
    } else {
      // Duplicate class package references
      if (new Set(furtherFiltered.map(item => item.classPackage)).size === 1) {
        correctImport = furtherFiltered[0];
      } else {
        console.log('Might want to check this, this might actually be className instead? ' + blueprintName);
        console.log('Filtered Imports:', imports);
        throw new Error('Too many imports');
      }
    }
  }

  const marshaller = new Marshaller();
  const fakeTag = ({
    tag: {
      reference: correctImport,
    },
  } as unknown) as Shape<typeof FPropertyTag>;
  marshaller.marshalClassReference(fakeTag);

  return marshaller.getDependencies()[0];
}