import { EResourceForm } from "../../../../../.DataLanding/interfaces/enums";

export default class ConnectionMapper {
  constructor() {
  }

  processedConnectionMap = new Map<string, any>();

  classHandlerMap = new Map<string, any> ();

  public addCustomClassHandler(classToHandle: string, handleFunction: any) {
    this.classHandlerMap.set(classToHandle, handleFunction);
  }

  private addBasicMaps(baseName: string) {
    this.processedConnectionMap.set(baseName, {
      resourceFormMap: new Map<number, any>(),
      humanReadableResourceFormMap: new Map<string, any>()
    })
  }

  public getFinalResourceMapString() {
    return JSON.stringify(this.processedConnectionMap, function replacer(key: string, value: any) {
      if(value instanceof Map) {
        return Object.fromEntries(value)
      } else {
        return value;
      }
    }, 2)
  }

  public addConnectionMap(slugMap: Map<string, string>, classToFileMap: Map<string, Set<string>>,
                          connectionMap: Map<string, any[]>, propertyField: string,
                          resourceType: EResourceForm,
                          resourceFormEnum: any,
                          directionEnum: any) {
    for (const [claz, fileNames] of classToFileMap.entries()) {
      // claz is FGBuildableAttachmentMerger
      // fileNames is 'FactoryGame/Content/FactoryGame/Buildable/Factory/CA_Merger/Build_ConveyorAttachmentMerger.uasset'

      for (const filename of fileNames) {
        const slug = slugMap.get(filename);

        if (!slug) throw new Error("Could not find slug for filename " + filename);

        if (!this.processedConnectionMap.has(slug)) {
          this.addBasicMaps(slug);
        }

        const slugResourceFormMap = this.processedConnectionMap.get(slug)!.resourceFormMap;
        const readableSlugResourceFormMap = this.processedConnectionMap.get(slug)!.humanReadableResourceFormMap;

        const entries = connectionMap.get(filename);
        let connectionCount = new Map<number, number>();
        let readableConnectionCount = new Map<string, number>();

        let usedEntries = entries;
        if (this.classHandlerMap.has(claz)) {
          usedEntries = this.classHandlerMap.get(claz)!();
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

        if (!slugResourceFormMap.has(resourceType)) {
          slugResourceFormMap.set(resourceType, connectionCount);

          const readableResourceType = resourceFormEnum[resourceType.toString()];
          readableSlugResourceFormMap.set(readableResourceType, readableConnectionCount);
        } else {
          throw new Error(`ResourceForm ${resourceType} already exists in slugMap`)
        }
      }
    }
  }
}