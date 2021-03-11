import {Reader} from "../../../../readers/Reader";
import {Int32} from "../../../primitive/integers";
import {UAsset} from "../../../pakfile/UAsset";
import {FPackageIndex} from "../../file/FPackageIndex";

export function InventoryItem(asset: UAsset) {
  return async function InventoryItemReader(reader: Reader) {
    return {
      ItemClass: await reader.read(FPackageIndex(asset.imports, asset.exports)),
      ItemState: await reader.read(Int32),
    };
  }
}
