import {readFPropertyTagLoop} from "../FPropertyTag";
import {Reader} from "../../../../readers/Reader";
import {UAsset} from "../../../pakfile/UAsset";

export function FStructFallback(asset: UAsset) {
  return async function FStructFallbackParser(reader: Reader) {
    return await readFPropertyTagLoop(reader, asset);
  };
}
