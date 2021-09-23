import {FByteBulkDataHeader} from "./FByteBulkDataHeader";
import {Reader} from "../../../readers/Reader";

export function FByteBulkData(ubulkReader: Reader | undefined, bulkOffset: bigint) {
  return async function FByteBulkDataReader(reader: Reader) {
    const header = await reader.read(FByteBulkDataHeader);
    // 3-6
    // 0b1001000
    let data = null;
    if (header.bulkDataFlags & 1 << 6) {
      console.log("bulk data in .uexp file (Force Inline Payload)");
      data = await reader.readBytes(header.bulkDataSize);
    } else if (header.bulkDataFlags & 1 << 11) {
      // https://github.com/WorkingRobot/upp/blob/ceb6e26f71768e02159c14aa4993783dfd1aa319/src/lib/Objects/CoreUObject/Serialization/EBulkDataFlags.h
      throw new Error("bulk data in .uptnl file (Optional Payload)")
      // if (!ubulkReader) throw new Error("Missing uBulkReader");
      // const seekingTo = header.bulkDataOffset + bulkOffset;
      // ubulkReader.seekTo(seekingTo);
      // data = await ubulkReader.readBytes(header.bulkDataSize);
    } else if (header.bulkDataFlags & 1 << 8) {
      console.log("bulk data in .ubulk file (Payload In Separate File) ");
      // BULKDATA_PayloadInSeperateFile
      if (!ubulkReader) throw new Error("Missing uBulkReader");
      ubulkReader.seekTo(header.bulkDataOffset);
      data = await ubulkReader.readBytes(header.bulkDataSize);
    } else if (header.bulkDataFlags & 1 << 0) {
      console.log("bulk data in .uexp file (Payload At End Of File)");
      const seekingTo = header.bulkDataOffset + bulkOffset;
      reader.seekTo(seekingTo);
      data = await reader.readBytes(header.bulkDataSize);
    }

    if (!(data instanceof Buffer)) {
      throw new Error('Could not read data');
    }

    return {
      header,
      data,
      dataLength: header.bulkDataSize,
    };
  };
}