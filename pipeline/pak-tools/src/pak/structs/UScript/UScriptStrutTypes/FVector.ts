import { Float } from '../../../primitive/decimals';
import {Reader} from "../../../../readers/Reader";

export async function FVector(reader: Reader) {
  return {
    X: await reader.read(Float),
    Y: await reader.read(Float),
    Z: await reader.read(Float),
  };
}
