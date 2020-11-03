import {FObjectImport} from "./FObjectImport";
import {FObjectExport, FObjectExportFromExports} from "./FObjectExport";
import {Shape} from "../../../util/parsers";
import {Reader} from "../../../readers/Reader";
import {Int32} from "../../primitive/integers";

type FPackageIndexType = {
  reference: any,
  index: number
}

export function FPackageIndexEntry(
  index: number,
  imports: Shape<typeof FObjectImport>[],
  exports: Shape<typeof FObjectExport>[],
) {
  return async function(reader: Reader): Promise<FPackageIndexType> {
    if (index === 0) {
      return {
        reference: null,
        index: 0
      }
    }

    const asImport = (-index - 1);
    const asExport = (index - 1)

    if (index < 0 && asImport < imports.length) {
      return {
        reference: imports[asImport],
        index: asImport
      }
    } else if (index > 0 && asExport < exports.length) {
      return {
        reference: await reader.read(FObjectExportFromExports(asExport, imports, exports)),
        index: asImport
      }
    }

    // We can read the actual import by doing this:
    // reference.outerImport = JSON.parse(
    //   JSON.stringify(await reader.read(FPackageIndexInt(reference.outerIndex, imports, exports))),
    // );

    return {
      reference: null,
      index: 0
    }
  };
}

export function FPackageIndex(
  imports: Shape<typeof FObjectImport>[],
  exports: Shape<typeof FObjectExport>[],
  index?: number
) {
  return async function(reader: Reader) {
    if (index === undefined) {
      const readIndex = await reader.read(Int32);

      return await reader.read(FPackageIndexEntry(readIndex, imports, exports));
    } else {
      return await reader.read(FPackageIndexEntry(index, imports, exports))
    }
  };
}