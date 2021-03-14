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
  } catch (e) {
  }
  try {
    jsonRetriever(`A${classSearch}`);
    AObject = `A${classSearch}`;
    retrievalCount++;
  } catch (e) {
  }
  try {
    jsonRetriever(`${classSearch}`);
    baseObject = `${classSearch}`;
    retrievalCount++;
  } catch (e) {
  }

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

export function getJsonForObjectStrict(className: string) {
  return jsonRetriever(className as string);
}

const jsonRetriever = (className: string) => {
  const data = (JSONFiles as any)[className];
  if (!data) {
    throw new Error(`No data found for ${className}`);
  }

  return data;
};

const cachedPropertyClasses = Object.keys(JSONFiles).map(key => {
  const properties = jsonRetriever(key);
  const setProps: Set<string> = new Set(properties.required);
  return [key, setProps];
});

export const findPossibleClasses = (names: Set<string>) => {
  const matches: string[] = [];

  if (!names.size) return matches;

  cachedPropertyClasses.forEach(([key, propertySet]) => {
    if (
      [...names].every((item: string) => {
        return (propertySet as Set<string>).has(item);
      })
    ) {
      matches.push(key as string);
    }
  })

  if (matches.length === 1) {
    console.error("Found singular bruteforce match", matches[0], "for", names);
  }

  return matches;
};

