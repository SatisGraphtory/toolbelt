export default class PakTranslator {
  constructor() {
  }

  public translationMap = new Map<string, string>();

  addDefaultSource(propertyMap: Map<string, any>, processingFunction: any) {
    for (const [key, entry] of propertyMap.entries()) {
      const value = processingFunction(entry, key);

      this.translationMap.set(key, value);
    }
  }
}