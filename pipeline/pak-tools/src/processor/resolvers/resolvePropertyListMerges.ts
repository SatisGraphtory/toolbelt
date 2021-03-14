import {Shape} from "../../util/parsers";
import {FPropertyTag} from "../../pak/structs/UScript/FPropertyTag";

function getPropertyNames(properties: Shape<typeof FPropertyTag>[]): string[] {
  return properties.map(item => item?.name).filter(item => item) as string[];
}

function getPropertiesWithBlacklist(properties: Shape<typeof FPropertyTag>[], blacklistedNames: Set<string>) {
  return properties.filter(item => {
    const name = item?.name;
    if (name) {
      return !blacklistedNames.has(name)
    }

    throw new Error("Found property with no name")
  })
}

function getPropertyWithName(properties: Shape<typeof FPropertyTag>[], searchName: string): Shape<typeof FPropertyTag> {
  const foundProperties = properties.filter(item => {
    const name = item?.name;
    if (name) {
      return searchName === name
    }

    throw new Error("Found property with no name")
  });

  if (foundProperties.length !== 1) {
    throw new Error("Found " + foundProperties.length + " properties with name " + searchName);
  }

  return foundProperties[0];
}

function getPropertiesWithName(properties: Shape<typeof FPropertyTag>[], searchName: string): Shape<typeof FPropertyTag>[] {
  return properties.filter(item => {
    const name = item?.name;
    if (name) {
      return searchName === name
    }

    throw new Error("Found property with no name")
  });
}

function findGuidProperties(propertyNames: Set<string>) {
  let guids = new Set<string>();
  for (const property of propertyNames) {
    if (property.toLowerCase().indexOf('guid') !== -1) {

    }
  }
}

function countPropertyInstances(propertyName: string, propertyList: string[]) {
  return propertyList.reduce((counter, element) => (element === propertyName ? counter + 1 : counter), 0)
}

export async function resolvePropertyListMerges(basePropertyList: Shape<typeof FPropertyTag>[], subclassPropertyList: Shape<typeof FPropertyTag>[]) {
  if (!basePropertyList.length) {
    return subclassPropertyList;
  }

  if (!subclassPropertyList.length) {
    return basePropertyList;
  }

  const basePropertyNames = getPropertyNames(basePropertyList);
  const overridePropertyNames = getPropertyNames(subclassPropertyList);

  const basePropertyNamesSet = new Set(basePropertyNames) as Set<string>;
  const overridePropertyNamesSet = new Set(overridePropertyNames) as Set<string>;

  const overlappingPropertyNames: Set<string> = new Set([...basePropertyNamesSet]
    .filter(baseProperty => overridePropertyNamesSet.has(baseProperty)).filter(name => name)) as Set<string>;

  const fullPropertyList = [...getPropertiesWithBlacklist(subclassPropertyList, basePropertyNamesSet),
    ...getPropertiesWithBlacklist(basePropertyList, overridePropertyNamesSet)]


  // TODO: Remove this debug
  const DebugCopyOfProperties = new Set([...overlappingPropertyNames]);

  for (const overlappingPropertyName of overlappingPropertyNames) {
    const basePropertyNameCount = countPropertyInstances(overlappingPropertyName, basePropertyNames)
    const overridePropertyNameCount = countPropertyInstances(overlappingPropertyName, overridePropertyNames)

    if (basePropertyNameCount === 1 && overridePropertyNameCount === 1) {
      // Scott free!
      const foundBaseProperty = getPropertyWithName(basePropertyList, overlappingPropertyName);
      const foundOverridingProperty = getPropertyWithName(subclassPropertyList, overlappingPropertyName);

      // except maybe check GUIds
      if (foundBaseProperty?.propertyGuid || foundOverridingProperty?.propertyGuid) {
        console.log(overlappingPropertyName, foundBaseProperty?.propertyGuid, foundOverridingProperty?.propertyGuid)
        throw new Error("Why do these have GUIDs?")
      }

      fullPropertyList.push(foundOverridingProperty);
      DebugCopyOfProperties.delete(overlappingPropertyName);
    } else if (basePropertyNameCount === overridePropertyNameCount) {
      const theseProperties = getPropertiesWithName(subclassPropertyList, overlappingPropertyName);

      // TODO: Figure out what to do with overlapping properties
      // const equalityCheck = theseProperties.map(item => {
      //   return JSON.stringify(item!.tag!.reference)
      // })
      //
      // if (!equalityCheck.every(item => item === equalityCheck[0])) {
      //   // TODO: If there are DUPLICATE properties what the hell do we do??
      //   consoleInspect(theseProperties)
      //   consoleInspect(getPropertiesWithName(basePropertyList, overlappingPropertyName))
      //   console.log(equalityCheck);
      //   process.exit(1)
      // }

      fullPropertyList.push(theseProperties[0]);
      // for (const property of getPropertiesWithName(subclassPropertyList, overlappingPropertyName)) {
      //   fullPropertyList.push(property);
      // }

      DebugCopyOfProperties.delete(overlappingPropertyName);
    } else {
      const theseProperties = getPropertiesWithName(subclassPropertyList, overlappingPropertyName);
      fullPropertyList.push(theseProperties[0]);
      DebugCopyOfProperties.delete(overlappingPropertyName);
      // console.log("==============")
      // console.log(basePropertyList)
      // console.log("~~~~~~~~~~~~~~~")
      // console.log(subclassPropertyList)
      // console.log(overlappingPropertyName)
      // throw new Error("Multiples detected")
    }
  }

  if (DebugCopyOfProperties.size) {
    console.log("==============")
    console.log(basePropertyList)
    console.log("~~~~~~~~~~~~~~~")
    console.log(subclassPropertyList)
    console.log(DebugCopyOfProperties)
    throw new Error("We have overlapping properties");
  }

  return fullPropertyList;
}