import {guessSubclassesFromJsonClassName} from "../json/guessSubclassesFromJsonClassName";
import { inheritanceMap } from '../../../../../../.DataLanding/interfaces';

const findCodeClassName = (baseName: string) => {
  const prefixes = ['F', 'U', 'A', ''];
  for (const prefix of prefixes) {
    const name = prefix + baseName
    if ((inheritanceMap as any)[name] !== undefined) {
      return name;
    }

    const thisRegex = new RegExp('^' + prefix + '(.*)');
    if (thisRegex.test(baseName)) {
      const subtractedName = thisRegex.exec(baseName)![1];
      if ((inheritanceMap as any)[subtractedName] !== undefined) {
        return subtractedName;
      }
    }
  }

  console.log("Could not find baseName", baseName);
  process.exit(1);
}

function traverse(name: string, endName: string): string[] | null {
  if (name === endName) return [endName];
  const results = (inheritanceMap as any)[name] || [];
  for (const result of results) {
    const traversal = traverse(result, endName);
    if (traversal) {
      return [...traversal, name]
    }
  }

  return null;
}

export default function generateClassMap(baseClass: string, subClasses: Set<string>) {
  const baseClassCodeName = findCodeClassName(baseClass);

  const masterInheritanceMap = new Map<string, any>();

  for (const claz of subClasses) {
    if (claz === baseClass) continue;
    const codeClassName = findCodeClassName(claz);

    const chain = traverse(codeClassName, baseClassCodeName);
    for (let i = 0; i < chain!.length - 1; i++) {
      const thisOne = chain![i];
      const nextOne = chain![i + 1];
      if (!masterInheritanceMap.has(thisOne)) {
        masterInheritanceMap.set(thisOne, new Set());
      }

      masterInheritanceMap.get(thisOne)!.add(nextOne);
    }
  }

  const finalMap = new Map<string, any[]>();
  for (const [name, entry] of masterInheritanceMap.entries()) {
    finalMap.set(name, [...entry])
  }

  return finalMap;
}

