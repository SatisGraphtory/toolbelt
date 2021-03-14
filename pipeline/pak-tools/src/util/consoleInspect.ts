import util from "util";

export default function consoleInspect(obj: any) {
  console.log(util.inspect(obj, false, null, true));
}