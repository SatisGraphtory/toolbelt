import {Reader} from './Reader';

export class ChildReader extends Reader {
  private readonly offset: bigint;
  public size: bigint

  constructor(private parent: Reader, offset: number | bigint, size: number | bigint) {
    super();
    this.offset = BigInt(offset);
    this.size = BigInt(size);
  }

  async readBytesAt(position: number | bigint, length: number | bigint) {
    const bigIntPos = BigInt(position)
    return await this.parent.readBytesAt(this.offset + bigIntPos, length);
  }
}
