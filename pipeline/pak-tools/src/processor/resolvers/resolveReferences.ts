import {Marshaller} from "../marshaller/marshaller";
import {Shape} from "../../util/parsers";
import {FPropertyTag} from "../../pak/structs/UScript/FPropertyTag";
import {UObject} from "../../pak/pakfile/UObject";
import {PakFile} from "../../pak/PakFile";
import util from 'util';

export function resolveReferenceName(baseObject: UObject, blueprintName: string, pakFile: PakFile) {
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

  // console.log("CORRECT IMPORT", util.inspect(correctImport, false, null, true ) )

  const marshaller = new Marshaller(pakFile);
  const fakeTag = ({
    tag: {
      reference: correctImport,
    },
  } as unknown) as Shape<typeof FPropertyTag>;
  marshaller.marshalClassReferenceV2(fakeTag);

  // if (marshaller.getDependencies()[0] === 'FactoryGame/Content/FactoryGame/Buildable/Factory/ConveyorBeltMk1/Build_ConveyorBeltMk1') {
  //   if (blueprintName === 'Build_ConveyorBeltMk1_C') {
  //   //   if (blueprintName === 'SplineComponent') {
  //     throw new Error("F!!!!!!!");
  //   }
  // }

  return marshaller.getDependencies()[0];
}