import * as JSONFiles from '../../../../../.DataLanding/json';

export function findJsonObject(classSearch: string) {
  let UObject = null;
  let AObject = null;
  let baseObject = null;
  let retrievalCount = 0;

  try {
    jsonRetriever(`U${classSearch}`);
    UObject = `U${classSearch}`;
    retrievalCount++;
  } catch (e) {}
  try {
    jsonRetriever(`A${classSearch}`);
    AObject = `A${classSearch}`;
    retrievalCount++;
  } catch (e) {}
  try {
    jsonRetriever(`${classSearch}`);
    baseObject = `${classSearch}`;
    retrievalCount++;
  } catch (e) {}

  if (retrievalCount === 0) {
    throw new Error(`No data found for ${classSearch}`);
  } else if (retrievalCount === 1) {
    return [UObject, AObject, baseObject].filter(item => item)![0];
  } else {
    // Too many
    throw new Error(
      `Too many classes found: ${[UObject, AObject, baseObject].filter(item => item).join(', ')}`,
    );
  }
}

export function getJsonForObject(className: string) {
  return jsonRetriever(findJsonObject(className) as string);
}

let i = 0;
export const findPossibleClasses = (names: Set<string>) => {
  console.error("CALLING", i++);
  const matches: string[] = [];
  Object.keys(JSONFiles).filter(key => {
    const properties = jsonRetriever(key);
    const setProps = new Set(properties.required);
    if (
      [...names].every((item: string) => {
        return setProps.has(item);
      })
    ) {
      matches.push(key);
    }
  });
  return matches;
};

const jsonRetriever = (className: string) => {
  const data = (JSONFiles as any)[className];
  if (!data) {
    throw new Error(`No data found for ${className}`);
  }

  return data;
};