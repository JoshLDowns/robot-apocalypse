export const convertMappingToString = (mapping) => {
  const mapArray = Object.keys(mapping).map((dir) => {
    if (mapping[dir].roomId && mapping[dir].visible) {
      return dir[0].toUpperCase() + dir.slice(1);
    } else {
      return false;
    }
  }).filter((newDir) => newDir)

  return mapArray.join(", ")
}