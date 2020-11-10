import {classReference} from '../../../../../.data-landing/interfaces/native/references';
import {FPropertyTag} from '../../structs/FPropertyTag';
import {Shape} from '../../util/parsers';

export class Marshaller {
  public dependencies: Set<string> = new Set();

  getDependencies(): string[] {
    return [...this.dependencies];
  }

  marshalClassReference(property: Shape<typeof FPropertyTag>): null | classReference<any> {
    // It's a classReference
    let previousTraversalNode = null as any;
    let traversalNode = property!.tag ? (property?.tag).reference : (property as any).reference;
    if (!traversalNode) {
      return null;
    }
    if (!traversalNode.outerImport) {
      const paths = traversalNode.classPackage.split('/');

      // We remove the last part and instead replace it with the objectName in the previous traversal
      paths.pop();

      // To get the proper object name, we need to replace the class name from the previous traversal.
      const name = traversalNode.objectName.replace(/_C$/g, '');

      const pkg = paths.join('/').replace('/Game/', 'FactoryGame/Content/');

      this.dependencies.add([pkg, name].join('/'));
      return {
        // In-place replacement of the proper pakfile structure
        package: pkg,
        name,
      };
    } else {
      while (traversalNode.outerImport.reference) {
        previousTraversalNode = traversalNode;
        traversalNode = traversalNode.outerImport.reference;
      }

      const paths = traversalNode.objectName.split('/');

      // We remove the last part and instead replace it with the objectName in the previous traversal
      paths.pop();

      // {
      //   "name": "ItemClass",
      //   "propertyType": "ObjectProperty",
      //   "size": 4,
      //   "arrayIndex": 0,
      //   "tagMetaData": null,
      //   "propertyGuid": null,
      //   "tag": {
      //   "processedIndex": -2,
      //     "reference": {
      //     "classPackage": "/Script/Engine",
      //       "className": "BlueprintGeneratedClass",
      //       "outerIndex": -13,
      //       "objectName": "Desc_SpaceElevatorPart_3_C",
      //       "outerImport": {
      //       "processedIndex": -13,
      //         "reference": {
      //         "classPackage": "/Script/CoreUObject",
      //           "className": "Package",
      //           "outerIndex": 0,
      //           "objectName": "/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart",
      //           "outerImport": {
      //           "processedIndex": null,
      //             "reference": null
      //         }
      //       }
      //     }
      //   }
      // }

      // To get the proper object name, we need to replace the class name from the previous traversal.
      const name = previousTraversalNode.objectName.replace(/_C$/g, '');

      const pkg = paths.join('/').replace('/Game/', 'FactoryGame/Content/');

      this.dependencies.add([pkg, name].join('/'));

      return {
        // In-place replacement of the proper pakfile structure
        package: pkg,
        name,
      };
    }
  }
}
