import * as fs from 'fs';
import * as util from 'util';

import {Reader} from './Reader';
import {bigintToNumber} from "../util/numeric";

const open = util.promisify(fs.open);
const read = util.promisify(fs.read);
const fstat = util.promisify(fs.fstat);

export class FileReader extends Reader {
  size!: bigint;
  private fd!: number;

  constructor(private path: string) {
    super();
  }

  async open() {
    this.fd = await open(this.path, fs.constants.O_RDONLY);
    const stats = await fstat(this.fd);
    this.size = BigInt(stats.size);
  }

  async readBytesAt(position: number | bigint, length: number | bigint) {
    const intPosition = bigintToNumber(BigInt(position));
    length = bigintToNumber(BigInt(length));
    const buffer = Buffer.alloc(length);
    const {bytesRead} = await read(this.fd, buffer, 0, length, intPosition);
    if (bytesRead !== length) {
      throw new Error(
        `Expected to read ${length} bytes, but only read ${bytesRead} (at position ${position})`,
      );
    }
    return buffer;
  }
}
