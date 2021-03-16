import {Reader} from "../../../../../readers/Reader";
import {Int32, UInt16, UInt32, UInt8} from "../../../../primitive/integers";
import {ReadType} from "../ReadAsValue";
import {Shape} from "../../../../../util/parsers";
import {FName, NameMap} from "../../FName";
import {BytePropertyTagMetaData} from "../../properties/ByteProperty";

export function ByteProperty(tagMetaData: Shape<typeof BytePropertyTagMetaData>, names: NameMap, readType: ReadType) {
  return async function BytePropertyReader(reader: Reader) {
    switch(readType) {
      case ReadType.NORMAL:
        if (tagMetaData && tagMetaData !== 'None') {
          return await reader.read(FName(names));
        } else {
          return await reader.read(UInt8);
        }
      case ReadType.MAP:
        return await reader.read(UInt32);
      case ReadType.ARRAY:
        return await reader.read(UInt8);
      default:
        throw new Error("Unsupported read type " + readType + " in ByteProperty");
    }
  }
}