import {Reader} from "../../../readers/Reader";
import {Int32, Int64, UInt16, UInt32} from "../../primitive/integers";

export async function FByteBulkDataHeader(reader: Reader) {

  const bulkDataFlags = await reader.read(UInt32);
  let bulkDataSize = BigInt(0);
  let bulkDataSizeOnDisk = BigInt(0);
  if (bulkDataFlags & 1 << 13) {
    bulkDataSize = await reader.read(Int64);
    bulkDataSizeOnDisk = await reader.read(Int64);
  } else {
    bulkDataSize = BigInt(await reader.read(Int32));
    bulkDataSizeOnDisk = BigInt(await reader.read(Int32));
  }

  const bulkDataOffset = await reader.read(Int64);

  // 6 and 3
  // 0b1001000

  const ret = {
    bulkDataFlags,
    bulkDataSize,
    bulkDataSizeOnDisk,
    bulkDataOffset
  }

  if (bulkDataFlags & 1 << 15) {
    await reader.read(UInt16);
  }

  return ret;
}