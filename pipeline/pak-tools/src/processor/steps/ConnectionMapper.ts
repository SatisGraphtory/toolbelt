import {ConnectionTypeEnum} from "../../../../../.DataWarehouse/enums/dataEnums";

export default class ConnectionMapper {
  constructor() {
  }

  processedConnectionMap = new Map<string, any>();

  classHandlerMap = new Map<string, any>();

  public addCustomClassHandler(classToHandle: string, handleFunction: any) {
    this.classHandlerMap.set(classToHandle, handleFunction);
  }

  private addBasicMaps(baseName: string) {
    this.processedConnectionMap.set(baseName, {
      connectionMap: new Map<number, any>(),
      humanReadableConnectionMap: new Map<string, any>()
    })
  }

  public getFinalResourceMapString() {
    return JSON.stringify(this.processedConnectionMap, function replacer(key: string, value: any) {
      if (value instanceof Map) {
        return Object.fromEntries(value)
      } else {
        return value;
      }
    }, 2)
  }

  public addConnectionMap(slugToClassMap: Map<string, string>,
                          connectionMap: Map<string, any[]>,
                          propertyField: string,
                          connectionType: ConnectionTypeEnum,
                          connectionTypeName: any,
                          directionEnum: any) {
    for (const [slug, className] of slugToClassMap.entries()) {
      if (!this.processedConnectionMap.has(slug)) {
        this.addBasicMaps(slug);
      }

      const slugResourceFormMap = this.processedConnectionMap.get(slug)!.connectionMap;
      const readableSlugResourceFormMap = this.processedConnectionMap.get(slug)!.humanReadableConnectionMap;

      const entries = connectionMap.get(slug);
      let connectionCount = new Map<number, number>();
      let readableConnectionCount = new Map<string, number>();

      let usedEntries = entries;
      if (this.classHandlerMap.has(className)) {
        usedEntries = this.classHandlerMap.get(className)!();
      }

      for (const propertyEntry of usedEntries || []) {
        const connectionTypeValue = propertyEntry[propertyField];
        if (connectionTypeValue === undefined) throw new Error(`Field ${propertyField} did not contain a valid connection type`)

        const readableConnectionTypeValue = directionEnum[connectionTypeValue.toString()];

        if (!connectionCount.has(connectionTypeValue)) {
          connectionCount.set(connectionTypeValue, 0)
          readableConnectionCount.set(readableConnectionTypeValue, 0)
        }

        const currentValue = connectionCount.get(connectionTypeValue)!;
        connectionCount.set(connectionTypeValue, currentValue + 1);
        readableConnectionCount.set(readableConnectionTypeValue, currentValue + 1);
      }

      if (!slugResourceFormMap.has(connectionType)) {
        slugResourceFormMap.set(connectionType, connectionCount);

        readableSlugResourceFormMap.set(connectionTypeName, readableConnectionCount);
      } else {
        throw new Error(`Connection type ${connectionType} already exists in slugMap`)
      }
    }
  }

}