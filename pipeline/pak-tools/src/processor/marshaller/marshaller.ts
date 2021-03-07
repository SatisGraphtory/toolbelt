import {Shape} from '../../util/parsers';
import {FPropertyTag} from "../../pak/structs/UScript/FPropertyTag";
import {classReference} from "../../../../headers-to-interfaces/emit/native/references";
import {getJsonForObject} from "../loader/jsonLoader";
import {UScriptArray, UScriptArrayMetaData} from "../../pak/structs/UScript/UScriptStrutTypes/UScriptArray";
import {resolveSlug, resolveSlugFromPackageReference} from "../resolvers/resolveSlugs";

const blacklistedPropertyNames = new Set(['FullName']);

export class Marshaller {
  public dependencies: Set<string> = new Set();

  getDependencies(): string[] {
    return [...this.dependencies];
  }

  private getPropertyMetaFromClassMeta(propertyName: string, classMeta: any) {
    const propertyMeta = classMeta?.properties[propertyName];
    if (propertyMeta && propertyMeta.type) {
      return propertyMeta.type
    }

    return undefined;
  }

  private getDefaultFromMetaType(propertyName: string, classMeta: any) {
    const type = this.getPropertyMetaFromClassMeta(propertyName, classMeta)
    if (type !== undefined) {
      switch(type) {
        case 'boolean':
          return false;
        case 'array':
          return [];
        case 'number':
          return 0;
        default:
          console.error("Default type not implemented for type", type)
          return undefined;
      }
    } else {
      return undefined;
    }
  }

  private static defaultsAreEqual(a: any, b: any) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;

      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.

      for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    if (a?.size === 0 && b?.size === 0) {
      return true;
    }

    return false
  }

  private blacklistedDefaults: Set<string> = new Set([]);

  public addBlacklistedDefaultKeys(blacklistedDefaults: string[]) {
    for (const def of blacklistedDefaults) {
      this.blacklistedDefaults.add(def);
    }
  }
  private addToDefaultsMap(key: string, value: any, defaultsMap: Map<string, any>) {
    if (this.blacklistedDefaults.has(key)) {
      return;
    }

    if (defaultsMap.has(key)) {
      if (!Marshaller.defaultsAreEqual(defaultsMap.get(key), value)) {
        console.error("Mismatching default for", key, "with new value", value, "and stored value", defaultsMap.get(key))
        throw new Error("Mismatching default")
      }
    } else {
      defaultsMap.set(key, value);
    }
  }

  private defaultHandlerFunction = (defaultPropertyName: string): any => {
    throw new Error("Unhandled default property name " + defaultPropertyName);
  }

  setMissingDefaultHandlerFunction(handlerFunction: (defaultPropertyName: string) => any) {
    this.defaultHandlerFunction = handlerFunction;
  }

  marshalFromPropertyList<T>(propertyList: Shape<typeof FPropertyTag>[],
                          className: string,
                          defaultsMap: Map<string, any>,
                          docObject: Map<string, any> = new Map(),
                             useDefaults: boolean): T {


    let namesToProcess = new Set<string>();
    let classMeta: any = {};
    try {
      classMeta = getJsonForObject(`${className}`);
      namesToProcess = new Set(Object.keys(classMeta.properties || {}));
    } catch(e) {}

    const completeKeySet = new Set([...namesToProcess, ...docObject.keys()].filter(name => {
      return !blacklistedPropertyNames.has(name);
    }))

    const marshalledObject = <T>{};

    for (const prop of propertyList) {
      const propName = prop?.name as string;

      completeKeySet.delete(propName);

      // console.log(util.inspect(prop, false, null, true ));
      (marshalledObject as any)[propName] = this.marshalPropertyByPakType(prop, defaultsMap, docObject, useDefaults);
    }

    for (const propName of completeKeySet) {
      if (!docObject.has(propName)) {
        if (!useDefaults) {
          const defaultType = this.getDefaultFromMetaType(propName, classMeta);
          if (defaultType !== undefined) {
            (marshalledObject as any)[propName] = defaultType;
            this.addToDefaultsMap(propName, defaultType, defaultsMap);
          } else {
            if (!this.blacklistedDefaults.has(propName)) {
              throw new Error("No default implemented for type " + propName + ", this field should be added to blacklistedDefaults.");
            } else {
              const prop = this.defaultHandlerFunction(propName);
              if (prop !== undefined) {
                (marshalledObject as any)[propName] = prop;
              }
            }
          }
        } else {
          // We use the existing defaultMap to populate
          if (defaultsMap.has(propName)) {
            (marshalledObject as any)[propName] = defaultsMap.get(propName)!;
          } else {
            const defaultType = this.getDefaultFromMetaType(propName, classMeta);
            if (defaultType !== undefined) {
              (marshalledObject as any)[propName] = defaultType;
            } else {
              if (!this.blacklistedDefaults.has(propName)) {
                throw new Error("No default implemented for type " + propName + ", this field should be added to blacklistedDefaults.");
              } else {
                const prop = this.defaultHandlerFunction(propName);
                if (prop !== undefined) {
                  (marshalledObject as any)[propName] = prop;
                }
              }
            }
          }
        }
      } else {
        const prop = docObject.get(propName);
        if (typeof prop === 'string' || typeof prop === 'number') {
          (marshalledObject as any)[propName] = prop;
          this.addToDefaultsMap(propName, prop, defaultsMap);
        } else {
          const type = this.getPropertyMetaFromClassMeta(propName, classMeta);
          if (type !== undefined && prop == null) {
            const defaultType = this.getDefaultFromMetaType(propName, classMeta);
            if (defaultType !== undefined) {
              (marshalledObject as any)[propName] = defaultType;
              this.addToDefaultsMap(propName, defaultType, defaultsMap);
            } else {
              console.log(propName, prop, docObject);
              console.log(propertyList);
              throw new Error("[FIXABLE] Could not find the default type from type " + type);
            }
          } else {
            console.log(propName, prop, docObject);
            console.log(propertyList);
            throw new Error("PROP HERE")
          }
        }

      }
    }

    return marshalledObject;
  }

  private marshalArrayProperty(property: Shape<typeof FPropertyTag>, defaultsMap: Map<string, any>,
                               docObject: Map<string, any> = new Map(), useDefaults: boolean) {
    const { innerType } = property?.tagMetaData as Shape<typeof UScriptArrayMetaData>;

    const returnedArray: any[] = [];

    for (const arrayEntry of property?.tag as Shape<typeof UScriptArray>) {
      if (Array.isArray(arrayEntry)) {
        returnedArray.push(this.marshalFromPropertyList<any>(arrayEntry, innerType, defaultsMap, new Map(), useDefaults))
      } else {
        switch(innerType) {
          case 'SoftObjectProperty':
            returnedArray.push(this.marshalSoftClassReference(arrayEntry));
            break;
          default:
            console.log(arrayEntry);
            throw new Error("UNKNOWN Type: " + innerType);
        }

      }
    }

    return returnedArray;
  }


  private marshalSoftClassReference(property: Shape<typeof FPropertyTag>) {
    const objectPath = (property as any).assetPathName;

    const paths = objectPath.split('/');

    const fullName = paths.pop();

    const classNameParts = fullName.split('.');

    const className = classNameParts.pop();

    const name = classNameParts[0];
    const pkg = paths.join('/').replace('/Game/', 'FactoryGame/Content/');

    this.dependencies.add(`${[pkg, name].join('/')}.${className}`);

    return {
      subPath: (property as any).subPath,
      package: pkg,
      name,
      member: className,
      // TODO: remove this
      slug: resolveSlugFromPackageReference({package: pkg, name: className})
    };
  }

  private marshalPropertyByPakType(property: Shape<typeof FPropertyTag>, defaultsMap: Map<string, any>,
                                   docObject: Map<string, any> = new Map(), useDefaults: boolean) {
    if (!property) return null;
    switch(property.propertyType) {
      case 'TextProperty':
      case 'BoolProperty':
      case 'IntProperty':
      case 'FloatProperty':
        return property.tag;
      case 'ArrayProperty':
        return this.marshalArrayProperty(property, defaultsMap, docObject, useDefaults);
      case 'ObjectProperty':
        return this.marshalClassReference(property);
      default:
        console.log(property);
        throw new Error("Unknown propertyType " + property.propertyType)
    }
  }

  marshalClassReference(property: Shape<typeof FPropertyTag>): null | classReference<any> {
    // It's a classReference


    // Invalid
    // {
    //   classPackage: '/Script/Engine',
    //     className: 'SplineComponent',
    //   outerIndex: -3,
    //   objectName: 'SplineComponent',
    //   outerReference: {
    //   reference: {
    //     classPackage: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk1/Build_ConveyorBeltMk1',
    //       className: 'Build_ConveyorBeltMk1_C',
    //       outerIndex: -17,
    //       objectName: 'Default__Build_ConveyorBeltMk1_C',
    //       outerReference: {
    //       reference: {
    //         classPackage: '/Script/CoreUObject',
    //           className: 'Package',
    //           outerIndex: 0,
    //           objectName: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk1/Build_ConveyorBeltMk1',
    //           outerReference: { reference: null, index: 0 }
    //       },
    //       index: 16
    //     }
    //   },
    //   index: 2
    // }
    // }

    //Valid
    // {
    //   classPackage: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk1/Build_ConveyorBeltMk1',
    //     className: 'Build_ConveyorBeltMk1_C',
    //   outerIndex: -17,
    //   objectName: 'Default__Build_ConveyorBeltMk1_C',
    //   outerReference: {
    //   reference: {
    //     classPackage: '/Script/CoreUObject',
    //       className: 'Package',
    //       outerIndex: 0,
    //       objectName: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk1/Build_ConveyorBeltMk1',
    //       outerReference: { reference: null, index: 0 }
    //   },
    //   index: 16
    // }
    // }

    let traversalNode = property!.tag ? (property?.tag).reference : (property as any).reference;

    if (traversalNode.className === 'BlueprintGeneratedClass') {
      let previousTraversalNode = null as any;

      while (traversalNode.outerReference.reference) {
        previousTraversalNode = traversalNode;
        traversalNode = traversalNode.outerReference.reference;
      }

      const defaultObjectCheck = previousTraversalNode?.objectName?.replace(/_C$/g, '');

      // Fetch the deepest thing as the path
      if (defaultObjectCheck.startsWith('Default__')) {
        throw new Error("Object started with Default__")
      }

      const firstThingPath = traversalNode.objectName.split('/');

      const firstThingName = firstThingPath.pop().replace(/_C$/g, '');
      const firstThingPkg = firstThingPath.join('/').replace('/Game/', 'FactoryGame/Content/');

      this.dependencies.add([firstThingPkg, firstThingName].join('/'));

      return {
        // In-place replacement of the proper pakfile structure
        package: firstThingPkg,
        name: firstThingName,
        slug: resolveSlugFromPackageReference({package: firstThingPkg, name: firstThingName})
      };
    } else {
      const testThing = traversalNode.classPackage.split('/');
      const testThingName = testThing.pop();
      const testThingPackage = testThing.join('/').replace('/Game/', 'FactoryGame/Content/');

      this.dependencies.add([testThingPackage, testThingName].join('/'));

      return {
        // In-place replacement of the proper pakfile structure
        package: testThingPackage,
        name: testThingName,
        slug: resolveSlugFromPackageReference({package: testThingPackage, name: testThingName})
      };
    }




    if (!traversalNode) {
      return null;
    }

    if (!traversalNode.outerReference) {
      const firstThingPath = traversalNode.classPackage.split('/');
      firstThingPath.pop();
      const firstThingName = traversalNode.objectName.replace(/_C$/g, '');
      const firstThingPkg = firstThingPath.join('/').replace('/Game/', 'FactoryGame/Content/');

      this.dependencies.add([firstThingPkg, firstThingName].join('/'));

      if (!traversalNode.classPackage.startsWith('/Script')) {
        throw new Error("DFDSFDSF")
      }
      return {
        // In-place replacement of the proper pakfile structure
        package: firstThingPkg,
        name: firstThingName,
      };
    } else {
      let previousTraversalNode = null as any;
      while (traversalNode.outerReference.reference) {
        previousTraversalNode = traversalNode;
        traversalNode = traversalNode.outerReference.reference;
      }


      const defaultObjectCheck = previousTraversalNode.objectName.replace(/_C$/g, '');

      // Fetch the deepest thing as the path
      if (defaultObjectCheck.startsWith('Default__')) {

        // old
        const fullPath = traversalNode.objectName.replace('/Game/', 'FactoryGame/Content/')

        this.dependencies.add(fullPath);


        // new?
        // const fullPath = previousTraversalNode.classPackage.replace('/Game/', 'FactoryGame/Content/')
        // this.dependencies.add(fullPath);
        //


        const packagePath = fullPath.split('/');
        const name = packagePath.pop();

        return {
          package: packagePath.join('/'),
          name
        }
      } else {
        console.log("Second traversal:", traversalNode)
        throw new Error("Unimplemented flow")
      }

      const secondThingPath = traversalNode.objectName.split('/');
      const secondThingName = secondThingPath.pop();


      const secondThingPkg = secondThingPath.join('/').replace('/Game/', 'FactoryGame/Content/');

      this.dependencies.add([secondThingPkg, secondThingName].join('/'));

      // TODO:

      return {
        // In-place replacement of the proper pakfile structure
        package: secondThingPkg,
        name: secondThingName,
      };
    }

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
      //       "outerReference": {
      //       "processedIndex": -13,
      //         "reference": {
      //         "classPackage": "/Script/CoreUObject",
      //           "className": "Package",
      //           "outerIndex": 0,
      //           "objectName": "/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart",
      //           "outerReference": {
      //           "processedIndex": null,
      //             "reference": null
      //         }
      //       }
      //     }
      //   }
      // }
  }
}
