/**
 * Parser and content of a .uexp file (serialized UObjectBase exports).
 */
import {Shape} from "../../util/parsers";
import {FPropertyTag, readFPropertyTagLoop} from "../structs/UScript/FPropertyTag";
import {Reader} from "../../readers/Reader";
import {UAsset} from "./UAsset";
import {UInt32} from "../primitive/integers";
import {FGuid} from "../structs/UScript/UScriptStrutTypes/FGuid";

export class UObjectBase {
  propertyList = [] as Shape<typeof FPropertyTag>[];
  guid = null as any;

  constructor(
    private reader: Reader,
    public asset: UAsset,
    public exportTypes: string,
    private readGuid: boolean,
  ) {
  }

  async initialize() {
    this.propertyList = await readFPropertyTagLoop(this.reader, this.asset);

    if (this.readGuid && (await this.reader.read(UInt32)) !== 0) {
      if (this.reader.position + 16 <= this.reader.getSize()) {
        this.guid = await this.reader.read(FGuid);
      }
    }
  }
}