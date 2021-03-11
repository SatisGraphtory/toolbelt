import {Reader} from "../../../../readers/Reader";
import {FSkeletalMeshAreaWeightedTriangleSampler} from "./FSkeletalMeshAreaWeightedTriangleSampler";
import {NameMap} from "../FName";

export function FSkeletalMeshSamplingLODBuiltData(nameMap: NameMap) {
  return async function FSkeletalMeshSamplingLODBuiltDataReader(reader: Reader) {
    return {
      AreaWeightedTriangleSampler: await reader.read(FSkeletalMeshAreaWeightedTriangleSampler(nameMap))
    };
  }
}
