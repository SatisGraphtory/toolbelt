/**
 * Parser and content of a .uexp file.
 *
 */
import {UAsset} from "./UAsset";
import {Reader} from "../../readers/Reader";
import {UObjectBase} from "./UObjectBase";

export class UExp {
  constructor(private uasset: UAsset, private uexpReader: Reader, private ubulkReader?: Reader) {}

  async initialize() {
    for (const exp of this.uasset.exports) {
      this.uexpReader.seekTo(exp.serialOffset - this.uasset.summary.totalHeaderSize);

      const className = this.uasset.getClassNameFromExport(exp);
      const baseObject = new UObjectBase(this.uexpReader, this.uasset, className, true);
      await baseObject.initialize();

      // let itemToPush: UObjectBase;
      // if (className === 'Texture2D') {
      //   const texture2DFile = new UTexture2D(result.reader, bulkReader as ChildReader, asset);
      //   await texture2DFile.initialize();
      //   itemToPush = texture2DFile;
      //   fileType = 'Texture2D';
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