import {FName, NameMap} from "./FName";
import {Reader} from "../../../readers/Reader";
import {FGuid} from "./UScriptStrutTypes/FGuid";
import {Shape} from "../../../util/parsers";
import {UAsset} from "../../pakfile/UAsset";
import {Int16, Int32, Int64, Int8, UInt16, UInt32, UInt64, UInt8} from "../../primitive/integers";
import {bigintToNumber} from "../../../util/numeric";
import {Double, Float} from "../../primitive/decimals";
import {FPackageIndex} from "../file/FPackageIndex";
import {InterfaceProperty} from "./properties/InterfaceProperty";
import {FString} from "../../containers/FString";
import {DelegateProperty} from "./properties/DelegateProperty";
import {FSoftObjectPath} from "./properties/FSoftObjectPath";
import {FIntPoint} from "./UScriptStrutTypes/FIntPoint";
import {FVector} from "./UScriptStrutTypes/FVector";
import {FVector2D} from "./UScriptStrutTypes/FVector2D";
import {FRotator} from "./UScriptStrutTypes/FRotator";
import {FColor} from "./UScriptStrutTypes/FColor";
import {FLinearColor} from "./UScriptStrutTypes/FLinearColor";
import {FRichCurveKey} from "./UScriptStrutTypes/FRichCurveKey";
import {FMaterialInput} from "./UScriptStrutTypes/FMaterialInput";
import {VectorMaterialInput} from "./UScriptStrutTypes/FVectorMaterialInput";
import {ColorMaterialInput} from "./UScriptStrutTypes/ColorMaterialInput";
import {FBox2D} from "./UScriptStrutTypes/FBox2D";
import {FQuat} from "./UScriptStrutTypes/FQuat";
import {FVector4} from "./UScriptStrutTypes/FVector4";
import {FMovieSceneFrameRange} from "./UScriptStrutTypes/FMovieSceneFrameRange";
import {FFrameNumber} from "./UScriptStrutTypes/FFrameNumber";
import {FText} from "./UScriptStrutTypes/FText";
import {FPerPlatformInt} from "./UScriptStrutTypes/FPerPlatformInt";
import {FStructFallback} from "./UScriptStrutTypes/FStructFallback";
import {FPerPlatformFloat} from "./UScriptStrutTypes/FPerPlatformFloat";
import {FMovieSceneEvaluationTemplate} from "./UScriptStrutTypes/FMovieSceneEvaluationTemplate";
import {EnumProperty} from "./properties/EnumProperty";
import {ConsoleColor} from "../../../util/consoleColors";
import {InventoryItem} from "./satisfactory/InventoryItem";
import {FBox} from "./UScriptStrutTypes/FBox";
import {FScalarMaterialInput} from "./UScriptStrutTypes/FScalarMaterialInput";
import {FMaterialAttributesInput} from "./UScriptStrutTypes/FMaterialAttributesInput";
import {FMovieSceneFloatChannel} from "./UScriptStrutTypes/FMovieSceneFloatChannel";
import {FieldPathProperty} from "./properties/FieldPathProperty";
import {FMovieSceneFloatValue} from "./UScriptStrutTypes/FMovieSceneFloatValue ";
import {FMovieSceneEvaluationFieldEntityTree} from "./UScriptStrutTypes/Objects/MovieScene/Evaluation/FMovieSceneEvaluationFieldEntityTree";

const MAX_RECURSION_DEPTH = 50;

export function StructPropertyTagMetaData(names: NameMap) {
  return async function StructParser(reader: Reader) {
    let result = {
      structName: '',
      structGuid: {},
    };
    try {
      result.structName = await reader.read(FName(names));
      result.structGuid = await reader.read(FGuid);
    } catch (e) {
      console.debug('StructPropertyMetaData could not be properly read');
      result = null as any;
    }

    return result;
  };
}

export const fullyReadStructProperties = new Set();
export const incompletelyReadStructProperties = new Set();

// https://github.com/EpicGames/UnrealEngine/blob/7d9919ac7bfd80b7483012eab342cb427d60e8c9/Engine/Source/Runtime/CoreUObject/Private/UObject/Class.cpp#L2146
export function UScriptStruct(
  tagMetaData: Shape<typeof StructPropertyTagMetaData>,
  asset: UAsset,
  depth: number,
  readSize: number,
  trackingReader: Reader
) {
  return async function StructParser(reader: Reader): Promise<any> {

    // TODO: Fix this number?
    if (depth > MAX_RECURSION_DEPTH) {
      return null;
    }

    let tag = null;

    if (tagMetaData) {
      switch (tagMetaData.structName) {
        // https://github.com/iAmAsval/FModel/blob/841e76d2d7fedffd89ce11fcb1d924a3eaeac4ca/FModel/PakReader/Parsers/PropertyTagData/ByteProperty.cs
        case "ByteProperty":
          tag = await reader.read(UInt32);
          break;
        case "BoolProperty":
          tag = await reader.read(UInt8) !== 0;
          break;
        case "ArrayProperty":
        case "AssetObjectProperty":
        case "MapProperty":
        case "SetProperty":
          throw new Error("Unhandled UScriptStruct Properties :(")
        case 'Int8Property':
          tag = await reader.read(Int8);
          break;
        case 'Int16Property':
          tag = await reader.read(Int16);
          break;
        case 'IntProperty':
          tag = await reader.read(Int32);
          break;
        case 'Int64Property':
          tag = bigintToNumber(await reader.read(Int64));
          break;
        case 'UInt16Property':
          tag = await reader.read(UInt16);
          break;
        case 'UInt32Property':
          tag = await reader.read(UInt32);
          break;
        case 'UInt64Property':
          tag = await reader.read(UInt64);
          break;
        case 'FloatProperty':
          tag = await reader.read(Float);
          break;
        case 'DoubleProperty':
          tag = await reader.read(Double);
          break;
        case 'ObjectProperty':
          tag = await reader.read(FPackageIndex(asset.imports, asset.exports));
          break;
        case 'InterfaceProperty':
          tag = await reader.read(InterfaceProperty);
          break;
        case 'StrProperty':
          tag = await reader.read(FString);
          break;
        case 'DelegateProperty':
          tag = await reader.read(DelegateProperty(asset.names));
          break;
        case 'SoftObjectProperty':
          tag = await reader.read(FSoftObjectPath(asset.names));
          break;
        case 'IntPoint':
          tag = await reader.read(FIntPoint);
          break;
        case 'Guid':
          tag = await reader.read(FGuid);
          break;
        case 'Vector':
          tag = await reader.read(FVector);
          break;
        case 'Vector2D':
          tag = await reader.read(FVector2D);
          break;
        case 'Rotator':
          tag = await reader.read(FRotator);
          break;
        case 'Color':
          tag = await reader.read(FColor);
          break;
        case 'LinearColor':
          tag = await reader.read(FLinearColor);
          break;
        case 'MovieSceneFloatValue':
          tag = await reader.read(FMovieSceneFloatValue);
          break;
        case 'RichCurveKey':
          tag = await reader.read(FRichCurveKey);
          break;
        case 'SoftClassPath':
          tag = await reader.read(FSoftObjectPath(asset.names));
          break;
        case 'ExpressionInput':
          tag = await reader.read(FMaterialInput(asset.names));
          break;
        case 'VectorMaterialInput':
          tag = await reader.read(VectorMaterialInput(asset.names));
          break;
        case 'ColorMaterialInput':
          tag = await reader.read(ColorMaterialInput(asset.names));
          break;
        case 'Box':
          tag = await reader.read(FBox);
          break;
        case 'Box2D':
          tag = await reader.read(FBox2D);
          break;
        case 'Quat':
          tag = await reader.read(FQuat);
          break;
        case 'Vector4':
          tag = await reader.read(FVector4);
          break;
        case 'MovieSceneFrameRange':
          tag = await reader.read(FMovieSceneFrameRange);
          break;
        case 'FrameNumber':
          tag = await reader.read(FFrameNumber);
          break;
        case 'NameProperty':
          tag = await reader.read(FName(asset.names));
          break;
        case 'TextProperty':
          tag = await reader.read(FText(asset.names));
          break;
        case 'MovieSceneEvaluationTemplate':
          tag = await reader.read(FMovieSceneEvaluationTemplate);
          break;
        case 'EnumProperty':
          tag = await reader.read(EnumProperty(asset.names));
          break;
        case 'PerPlatformFloat':
          tag = await reader.read(FPerPlatformFloat);
          break;
        case 'PerPlatformInt':
          tag = await reader.read(FPerPlatformInt);
          break;

        // These are RE'd classes.
        case 'ScalarMaterialInput':
          // https://github.com/FabianFG/JFortniteParse/blob/2b582e8c226f8605601a7689ef85298a25b414f0/src/main/kotlin/me/fungames/jfortniteparse/ue4/objects/engine/MaterialExpressionIO.kt#L127-L136
          tag = await reader.read(FScalarMaterialInput(asset));
          // console.log(readSize, trackingReader.getTrackedBytesRead());
          // process.exit(0);
          break;
        case 'MaterialAttributesInput':
          // https://github.com/FabianFG/JFortniteParse/blob/2b582e8c226f8605601a7689ef85298a25b414f0/src/main/kotlin/me/fungames/jfortniteparse/ue4/objects/engine/MaterialExpressionIO.kt#L180
          tag = await reader.read(FMaterialAttributesInput(asset));
          break;
        case 'MovieSceneFloatChannel':
          tag = await reader.read(FMovieSceneFloatChannel);
          break;
        case 'FieldPathProperty':
          tag = await reader.read(FieldPathProperty(asset.names));
          break;
        case 'MovieSceneEvaluationFieldEntityTree':
          tag = await reader.read(FMovieSceneEvaluationFieldEntityTree);
          break;
        case 'MovieSceneEntityComponentField':
        case 'MovieSceneSequenceID':
        case 'MovieSceneEvaluationFieldTrackPtr':
        case 'MovieSceneFieldEntry_EvaluationTrack':
        case 'MovieSceneEvaluationGroup':
        case 'MovieSceneEvaluationMetaData':
        case 'MovieSceneEvaluationField':
        case 'EventPayload':
        case 'MovieSceneEventSectionData':
        case 'FrameNumberRangeBound':
        case 'FrameNumberRange':
        case 'MovieSceneTrackEvaluationFieldEntry':
        case 'MovieSceneTrackEvaluationField':
        case 'ScalarParameterNameAndCurve':
        case 'MovieSceneEventPtrs':
        case 'MovieSceneEvent':
        case 'MovieSceneEventChannel':
        case 'ExposedValueHandler':
        case 'PropertyAccessSegment':
        case 'PropertyAccessLibrary':
        case 'SkeletalMeshLODInfo':
        case 'SkeletalMeshSamplingLODBuiltData':
        case 'SkeletalMeshSamplingBuiltData':
        case 'SkeletalMeshSamplingInfo':
          break;
        // TODO: fix these

        // This is a custom class, there will be more. :(
        case 'InventoryItem':
          tag = await reader.read(InventoryItem(asset));
          break;
        case 'StructProperty': // We want to use the default reader to fully read struct properties.
        default:
          let possibleProperties = null;
          const structName = tagMetaData.structName;
          let readSuccess = true;

          try {
            possibleProperties = await reader.read(FStructFallback(asset));

            if (possibleProperties.every(property => property.fullyRead)) {
              // Only log this if previous backup structure read was not listed.
              if (!fullyReadStructProperties.has(structName)) {
                console.info("Successful read of backup structure:", structName)
                fullyReadStructProperties.add(structName)
              }
            } else {
              readSuccess = false;
              console.log(ConsoleColor.FgRed, "Unsuccessful full read of:", structName, `(${readSize})`, ConsoleColor.Reset);
              incompletelyReadStructProperties.add(structName)
            }
          } catch (e) {
            readSuccess = false;
            console.log("Dumped Tag MetaData:", tagMetaData)
            console.log(ConsoleColor.FgRed, "Unsuccessful (errored) full read of:", structName, e, ConsoleColor.Reset);
            incompletelyReadStructProperties.add(structName);
            // process.exit(1);
          }

          return possibleProperties;
      }

    } else {
      throw new Error('No tagMetaData');
    }

    return tag;
  };
}
