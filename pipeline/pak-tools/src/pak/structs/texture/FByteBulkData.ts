import {FByteBulkDataHeader} from "./FByteBulkDataHeader";
import {Reader} from "../../../readers/Reader";

export function FByteBulkData(ubulkReader: Reader | undefined, bulkOffset: number) {
  return async function FByteBulkDataReader(reader: Reader) {
    const header = await reader.read(FByteBulkDataHeader);

    let data = null;
    if ((header.bulkDataFlags & 0x0040) !== 0) {
      data = await reader.readBytes(header.elementCount);
    }

    if ((header.bulkDataFlags & 0x0100) !== 0) {
      if (!ubulkReader) {
        throw new Error('Need ubulk file but none provided');
      }

      const seekingTo = header.offsetInFile + bulkOffset;

      ubulkReader.seekTo(seekingTo);
      data = await ubulkReader.readBytes(header.elementCount);
    }

    if (!(data instanceof Buffer)) {
      throw new Error('Could not read data');
    }

    return {
      header,
      data,
      dataLength: header.elementCount,
    };
  };
}