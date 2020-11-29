export const determineAction = (input, mapping) => {
  let directionArray = ["dn", "ds", "de", "dw", "dnull"];
  let directionMap = {
    dn: "north",
    ds: "south",
    de: "east",
    dw: "west",
  };
  console.log(mapping[directionMap[input]]);
  if (directionArray.includes(input)) {
    if (input === "dnull") {
      return {
        action: null,
        value: null,
        message: "I am not what direction you are trying to go ...",
      };
    } else {
      if (
        mapping[directionMap[input]].roomId &&
        mapping[directionMap[input]].visible &&
        !mapping[directionMap[input]].locked
      ) {
        return {
          action: "change-room",
          value: mapping[directionMap[input]].roomId,
          message: "---",
        }
      } else if (
        mapping[directionMap[input]].roomId &&
        mapping[directionMap[input]].locked
      ) {
        return {
          action: null,
          value: null,
          message: `That door is locked! You need the ${mapping[directionMap[input]].keycard} to get through ...`,
        }
      } else {
        return {
          action: null,
          value: null,
          message: "There is nothing in that direction",
        }
      }
    }
  }
};
