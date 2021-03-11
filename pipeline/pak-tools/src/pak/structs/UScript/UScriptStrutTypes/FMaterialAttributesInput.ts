import {Reader} from "../../../../readers/Reader";
import {Int32, UInt32, UInt8} from "../../../primitive/integers";
import {UAsset} from "../../../pakfile/UAsset";
import {FPackageIndex} from "../../file/FPackageIndex";
import {FName} from "../FName";
import {Float} from "../../../primitive/decimals";

export function FMaterialAttributesInput(asset: UAsset) {
  return async function FScalarMaterialInputReader(reader: Reader) {
    return {
      outputIndex: await reader.read(Int32),
      inputName: await reader.read(FName(asset.names)),
      mask: await reader.read(UInt32),
      maskR: await reader.read(UInt32),
      maskG: await reader.read(UInt32),
      maskB: await reader.read(UInt32),
      maskA: await reader.read(UInt32),
      expressionName: await reader.read(FName(asset.names))
    };
  }
}
