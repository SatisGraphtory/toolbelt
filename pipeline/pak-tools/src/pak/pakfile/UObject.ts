/**
 * Parser and content of a .uexp file.
 *
 */
import {UAsset} from "./UAsset";
import {Reader} from "../../readers/Reader";
import {UExports} from "./UExports";
import {v4 as uuidv4} from "uuid";
import {PakVersion} from "../PakFile";
import {UTexture2D} from "./uexports/UTexture2D";

export class UObject {
  constructor(private pakVersion: PakVersion, public uasset: UAsset, private uexpReader: Reader, private ubulkReader?: Reader) {
  }

  public readonly uuid: string = uuidv4();

  public uexports: UExports[] = [];

  public specialTypes = new Map<string, any[]>();

  async initialize() {
    for (const exp of this.uasset.exports) {
      this.uexpReader.seekTo(exp.serialOffset - this.uasset.summary.totalHeaderSize);

      const className = await this.uasset.getClassNameFromExport(exp);

      if (className === 'Texture2D') {
        const texture2DFile = new UTexture2D(this.uexpReader, this.uasset, className, true, this.pakVersion, this.ubulkReader);
        await texture2DFile.initialize();

        this.uexports.push(texture2DFile);
        if (!this.specialTypes.has('Texture2D')) {
          this.specialTypes.set('Texture2D', []);
        }
        this.specialTypes.get('Texture2D')!.push(texture2DFile);
      } else {
        const baseObject = new UExports(this.uexpReader, this.uasset, className, true, this.pakVersion);
        await baseObject.initialize();
        this.uexports.push(baseObject);
      }
      // } else if (className === 'DataTable') {
      //   //Data Table
      //   const DataTableFile = new UDataTable(result.reader, asset);
      //   await DataTableFile.initialize();
      //   itemToPush = DataTableFile;
      //   fileType = 'DataTable';
      // } else {
      //   const baseObject = new UObjectBase(result.reader, asset, className, true);
      //   // console.log(asset.filename);
      //   await baseObject.initialize();
      //   itemToPush = baseObject;
      // }
      //
      // // TODO: fix this with a flag maybe? This is basically to remove all the freaking empty properties.
      // if (itemToPush.propertyList.length) {
      //   exports.push(itemToPush);
      // }
    }
  }
}