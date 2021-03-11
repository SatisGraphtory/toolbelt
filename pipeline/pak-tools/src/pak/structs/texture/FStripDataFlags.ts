import {Reader} from "../../../readers/Reader";
import {UInt8} from "../../primitive/integers";

export async function FStripDataFlags(reader: Reader) {
  const globalStripFlags = await reader.read(UInt8);
  const classStripFlags = await reader.read(UInt8);

  // const editorDataStripped = (globalStripFlags & 1) !== 0;
  // const serverDataStripped = (globalStripFlags & 2) !== 0;

  return {
    globalStripFlags,
    classStripFlags,
  };
}