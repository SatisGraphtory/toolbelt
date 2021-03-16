import {Shape} from "../../../../util/parsers";
import {UAsset} from "../../../pakfile/UAsset";
import {Reader} from "../../../../readers/Reader";
import {StructPropertyTagMetaData} from "../UscriptStruct";


const MAX_RECURSION_DEPTH = 50;

export enum ReadType {
  NORMAL,
  MAP,
  ARRAY,
}

export function ReadAsValue(
  tagMetaData: Shape<typeof StructPropertyTagMetaData>,
  asset: UAsset,
  depth: number,
  readSize: number,
  trackingReader: Reader,
  readType: ReadType
) {
  return async function StructParser(reader: Reader): Promise<any> {

    // TODO: Fix this number?
    if (depth > MAX_RECURSION_DEPTH) {
      return null;
    }

    let tag = null;

    if (tagMetaData) {
      switch (tagMetaData.structName) {
      }
    }
  }
}