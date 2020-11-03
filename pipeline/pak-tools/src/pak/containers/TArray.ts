// https://github.com/SatisfactoryModdingUE/UnrealEngine/blob/4.22-CSS/Engine/Source/Runtime/Core/Public/Containers/Array.h#L1074-L1133
import {Parser} from "../../util/parsers";
import {UInt32} from "../primitive/integers";
import {Reader} from "../../readers/Reader";

export function TArray<TShape>(parser: Parser<TShape>): Parser<TShape[]> {
  return async function TArrayParser(reader: Reader) {
    const length = await reader.read(UInt32);
    return await reader.readList(length, parser);
  };
}
