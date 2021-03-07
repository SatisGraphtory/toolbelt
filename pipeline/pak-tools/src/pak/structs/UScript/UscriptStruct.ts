import {FName, NameMap} from "./FName";
import {Reader} from "../../../readers/Reader";
import {FGuid} from "./UScriptStrutTypes/FGuid";
import {Shape} from "../../../util/parsers";
import {UAsset} from "../../pakfile/UAsset";
import {Int16, Int32, Int64, Int8, UInt16, UInt32, UInt64} from "../../primitive/integers";
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
) {
  return async function StructParser(reader: Reader): Promise<any> {

    // TODO: Fix this number?
    if (depth > MAX_RECURSION_DEPTH) {
      return null;
    }

    let tag = null;
    if (tagMetaData) {
      switch (tagMetaData.structName) {
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
        case 'Box':
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



        // TODO: fix these
        // Whitelisted fallback entries.
        // case 'BodyInstance':
        // case 'CollisionResponse':
        // case 'ResponseChannel':
        // case 'SlateBrush':
        // case 'ItemView':
        // case 'ItemAmount':
        // case 'PointerToUberGraphFrame':
        // case 'ParticleMap':
        // case 'PoleHeightMesh':
        // case 'SingleAnimationPlayData':
        // case 'TimerHandle':
        // case 'FactoryTickFunction':
        // case 'ActorTickFunction':
        // case 'BlueprintComponentDelegateBinding':
        // case 'RichCurve':
        // case 'TTFloatTrack':
        // case 'FoundationSideSelectionFlags':
        // case 'SplitterSortRule':
        // case 'ActorComponentTickFunction':
        // case 'ComponentOverrideRecord':
        // case 'ComponentKey':
        // case 'BlueprintCookedComponentInstancingData':
        // case 'SplineCurves':
        // case 'InterpCurveVector':
        // case 'InterpCurvePointVector':
        // case 'InterpCurveFloat':
        // case 'InterpCurvePointFloat':
        // case 'StringPair':
        // case 'BPVariableMetaDataEntry':
        // case 'PostProcessSettings':
        // case 'WeightedBlendables':
        // case 'WeightedBlendable':
        // case 'MaterialFunctionInfo':
        // case 'KAggregateGeom':
        // case 'KBoxElem':
        // case 'StaticMaterial':
        // case 'MeshUVChannelInfo':
        // case 'BoxSphereBounds':
        // case 'FontImportOptionsData':
        // case 'KConvexElem':
        // case 'Transform':
        // case 'ScalarParameterValue':
        // case 'MaterialParameterInfo':
        // case 'MaterialInstanceBasePropertyOverrides':
        // case 'SoundConcurrencySettings':
        // case 'CompositeFont':
        // case 'Typeface':
        // case 'TypefaceEntry':
        // case 'KSphereElem':
        // case 'SoundClassProperties':
        // case 'TouchInputControl':
        // case 'Key':
        // case 'PaperTerrainMaterialRule':
        // case 'LightmassMaterialInterfaceSettings':
        // case 'DistanceBasedTickRate':
        // case 'SchematicMessagePair':
        // case 'ItemFoundData':
        // case 'ResearchTreeMessageData':
        // case 'TutorialHintData':
        // case 'RecipeAmountPair':
        // case 'CollectionScalarParameter':
        // case 'CollectionVectorParameter':
        // case 'Margin':
        // case 'ButtonStyle':
        // case 'SlateColor':
        // case 'AnchorData':
        // case 'Anchors':
        // case 'SlateChildSize':
        // case 'WidgetTransform':
        // case 'MovieScenePossessable':
        // case 'MovieSceneBinding':
        // case 'FrameRate':
        // case 'ResourceDepositPackage':
        // case 'Int32Interval':
        //   return await reader.read(FStructFallback(asset));
          //TODO: kill this?
        case 'InventoryItem':
          tag = await reader.read(FPackageIndex(asset.imports, asset.exports));
          break;
        // case 'SkeletalMeshSamplingLODBuiltData':
        // case 'FontCharacter':
        // case 'FontData':
        // case 'MovieSceneFloatChannel':
        // case 'ScalarMaterialInput':
        // case 'MaterialAttributesInput':
        // case 'MovieSceneEventParameters':
        // case 'MovieSceneParticleChannel':
        // case 'RawCurveTracks':
        // case 'SmartName':
        // case 'FloatCurve':
          // // https://github.com/EpicGames/UnrealEngine/blob/4.22/Engine/Source/Runtime/MovieScene/Public/Channels/MovieSceneFloatChannel.h#L299
          // return null;
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
              console.log(ConsoleColor.FgRed, "Unsuccessful full read of:", structName, ConsoleColor.Reset);
              incompletelyReadStructProperties.add(structName)
            }

          } catch (e) {
            readSuccess = false;
            console.log(ConsoleColor.FgRed, "Unsuccessful (errored) full read of:", structName, ConsoleColor.Reset);
            incompletelyReadStructProperties.add(structName)
          }

          // if (fullyReadStructProperties.has(structName) && incompletelyReadStructProperties.has(structName)) {
          //   throw new Error("Previously fully read structure is not fully read now: " + structName);
          // }

          return possibleProperties;
      }
    } else {
      throw new Error('No tagMetaData');
    }

    return tag;
  };
}
