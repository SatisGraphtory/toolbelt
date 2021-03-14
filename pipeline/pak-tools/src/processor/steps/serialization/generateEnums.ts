import BuildingJson from '../../../../../../.DataWarehouse/main/BuildingClasses.json';
import ItemJson from '../../../../../../.DataWarehouse/main/ItemClasses.json';
import RecipeJson from '../../../../../../.DataWarehouse/main/RecipeClasses.json';
import {
  buildingEnums,
  itemEnums,
  recipeEnums,
} from '../../../../../../.DataWarehouse/enums/dataEnums';

const formatEntry = (
  key: string,
  number: number,
  deprecated: boolean = false,
  isNew: boolean = false
) => {
  return (
    `\t'${key}' = ${number},` +
    (deprecated ? '// deprecated' : '') +
    (isNew ? ' // new value' : '')
  );
};

const generateEnums = (
  newEnumNames: any,
  oldEnumsMap: any,
  desiredName: string
) => {
  const newNamesSet = new Set(newEnumNames);

  const lineEntries: string[] = [];

  let maxValue = 0;

  for (const [name, value] of oldEnumsMap) {
    if (newNamesSet.has(name)) {
      newNamesSet.delete(name);
      maxValue = Math.max(maxValue, value);
      lineEntries.push(formatEntry(name, value, false));
    } else {
      lineEntries.push(formatEntry(name, value, true));
    }
  }

  maxValue++;

  let numNewEnums = 0;
  for (const name of newNamesSet) {
    numNewEnums++;
    lineEntries.push(formatEntry(name as string, maxValue++, false, true));
  }

  return {
    text: `export enum ${desiredName} {\n${lineEntries.join('\n')}\n}`,
    numNew: numNewEnums
  }
};

const generateBuildingEnums = () => {
  const oldEnumMap = Object.entries(buildingEnums).filter(
    ([, value]) => !isNaN(value as number)
  );
  const newEnumNames = Object.keys(BuildingJson);

  return generateEnums(newEnumNames, oldEnumMap, 'buildingEnums');
};

const generateRecipeEnums = () => {
  const oldEnumMap = Object.entries(recipeEnums).filter(
    ([, value]) => !isNaN(value as number)
  );
  const newEnumNames = Object.keys(RecipeJson);

  return generateEnums(newEnumNames, oldEnumMap, 'recipeEnums');
};

const generateItemEnums = () => {
  const oldEnumMap = Object.entries(itemEnums).filter(
    ([, value]) => !isNaN(value as number)
  );
  const newEnumNames = Object.keys(ItemJson);

  return generateEnums(newEnumNames, oldEnumMap, 'itemEnums');
};

const createEnumRevision = () => {
  const {text: buildingEnums, numNew: numBuildingChanges} = generateBuildingEnums();
  const {text: recipeEnums, numNew: numRecipeChanges} = generateRecipeEnums();
  const {text: itemEnums, numNew: numItemChanges} = generateItemEnums();
  return {
    text: `${buildingEnums}\n\n${recipeEnums}\n\n${itemEnums}\n`,
    numNew: numBuildingChanges + numRecipeChanges + numItemChanges
  }
}

export default createEnumRevision;