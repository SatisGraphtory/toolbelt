export async function getObjectNameFromFilename(filePath: string) {

  const filename = filePath.split('/').pop()!

  const baseFilename = filename.split('.').slice(0, -1).join('.');
  return `${baseFilename}_C`
}