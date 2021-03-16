import {Shape} from "../../../../util/parsers";
import {FName, FNameEntrySerialized, NameMap} from "../FName";
import {Int32, Int64, UInt32, UInt8} from "../../../primitive/integers";
import {Reader} from "../../../../readers/Reader";
import {FString} from "../../../containers/FString";
import {FFormatArgumentValue} from "./FFormatArgumentValue";
import {TArray} from "../../../containers/TArray";
import {FFormatArgumentData} from "./FFormatArgumentData";
import {FDateTime} from "./FDateTime";

enum ETextHistoryType {
  None = 255,
  Base = 0,
  NamedFormat,
  OrderedFormat,
  ArgumentFormat,
  AsNumber,
  AsPercent,
  AsCurrency,
  AsDate,
  AsTime,
  AsDateTime,
  Transform,
  StringTableEntry,
  TextGenerator,
  // Add new enum types at the end only! They are serialized by index.
}

async function readOrderedFormat(reader: Reader, names: Shape<typeof FNameEntrySerialized>[]) {
  const SourceFmt: any = await reader.read(FText(names));
  const numEntries = await reader.read(Int32);
  const Arguments: any[] = [];
  for (let i = 0; i < numEntries; i++) {
    Arguments.push(await reader.read(FFormatArgumentValue(names)));
  }
  return {
    SourceFmt,
    Arguments,
  };
}

export function FText(names: NameMap) {
  return async function FTextParser(reader: Reader): Promise<any> {
    // These are flags
    await reader.read(UInt32);
    const historyType = await reader.read(UInt8);

    switch (historyType) {
      case ETextHistoryType.Base:
        return {
          namespace: (await reader.read(FString)) || '',
          key: await reader.read(FString),
          sourceString: await reader.read(FString),
        };
      case ETextHistoryType.AsDateTime:
        return {
          SourceDateTime: await reader.read(FDateTime),
          DateStyle: await reader.read(UInt8),
          TimeStyle: await reader.read(UInt8),
          TimeZone: await reader.read(FString),
          TargetCulture: await reader.read(FString),
        };
      // https://github.com/EpicGames/UnrealEngine/blob/bf95c2cbc703123e08ab54e3ceccdd47e48d224a/Engine/Source/Runtime/Core/Private/Internationalization/TextHistory.cpp
      // https://github.com/EpicGames/UnrealEngine/blob/bf95c2cbc703123e08ab54e3ceccdd47e48d224a/Engine/Source/Runtime/Core/Private/Internationalization/TextData.h
      case ETextHistoryType.NamedFormat:
      case ETextHistoryType.OrderedFormat:
        return await readOrderedFormat(reader, names);
      case ETextHistoryType.AsNumber:
      case ETextHistoryType.AsPercent:
      case ETextHistoryType.AsCurrency:
        return {
          SourceValue: await reader.read(FFormatArgumentValue(names)),
          TimeZone: await reader.read(FString),
          TargetCulture: await reader.read(FString),
        };
      case ETextHistoryType.StringTableEntry:
        return {
          TableId: await reader.read(FName(names)),
          Key: await reader.read(FString),
        };
      case ETextHistoryType.None:
        return {
          CultureInvariantString: await reader.read(Int32) !== 0 ? await reader.read(FString) : null
        };
      case ETextHistoryType.ArgumentFormat:
        return {
          FormatText: await reader.read(FText(names)),
          Arguments: await reader.read(TArray(FFormatArgumentData(names))),
        }
      case ETextHistoryType.AsDate:
        return {
          SourceDateTime: await reader.read(FDateTime),
          DateStyle: await reader.read(UInt8),
          TimeStyle: await reader.read(UInt8),
          TimeZone: await reader.read(FString),
          CultureName : await reader.read(FString),
        };
      case ETextHistoryType.AsTime:
        return {
          SourceDateTime: await reader.read(FDateTime),
          TimeStyle: await reader.read(UInt8),
          TimeZone: await reader.read(FString),
          CultureName : await reader.read(FString),
        };
      case ETextHistoryType.Transform:
        return {
          SourceText: await reader.read(FText(names)),
          TransformType: await reader.read(UInt8)
        }
      case ETextHistoryType.TextGenerator:
      default:
        throw new Error('Possibly history type ' + historyType + ' not supported');
    }
  };
}
