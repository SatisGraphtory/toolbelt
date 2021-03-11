import {Reader} from "../../../../readers/Reader";
import {FName, NameMap} from "../FName";
import {Shape} from "../../../../util/parsers";
import {UAsset} from "../../../pakfile/UAsset";
import {Int32} from "../../../primitive/integers";
import {StructPropertyTagMetaData, UScriptStruct} from "../UscriptStruct";
import {MapPropertyTagMetaData} from "./MapProperty";

export function SetPropertyTagMetaData(names: NameMap) {
  return async function SetPropertyParser(reader: Reader) {
    return {
      innerType: await reader.read(FName(names)),
    };
  };
}

export function SetProperty(
  tagMetaData: Shape<typeof SetPropertyTagMetaData>,
  asset: UAsset,
  depth: number,
  readSize: number,
  trackingReader: Reader
) {
  return async function SetPropertyParser(reader: Reader) {
    const numKeysToRemove = await reader.read(Int32);

    const innerType = tagMetaData.innerType;

    const innerTypeMetaData: Shape<typeof StructPropertyTagMetaData> = {
      structName: innerType,
      structGuid: {},
    };

    for (let i = 0; i < numKeysToRemove; i++) {
      console.log('Removed key: ', await reader.read(UScriptStruct(innerTypeMetaData, asset, depth + 1, readSize, trackingReader)));
    }

    const numEntries = await reader.read(Int32);

    const tag = [] as any;

    for (let i = 0; i < numEntries; i++) {

      tag.push(await reader.read(UScriptStruct(innerTypeMetaData, asset, depth + 1, readSize, trackingReader)));
    }

    return tag;
  };
}
