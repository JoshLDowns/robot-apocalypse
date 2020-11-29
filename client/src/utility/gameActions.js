import {
  descLookup,
  getItemLookup,
  dropItemLookup,
  useableItemLookup,
  intObjectLookup,
  directionMap,
} from "./gameMaps";

import {
  directionArray,
  pickUpItems,
  dropItems,
  useableItems,
  intObjects,
} from "./inputArrays";

export const determineAction = (input, room, player) => {
  
  if (directionArray.includes(input)) {
    if (input === "dnull") {
      return {
        action: null,
        value: null,
        message: "I am not what direction you are trying to go ...",
      };
    } else {
      if (
        room.mapping[directionMap[input]].roomId &&
        room.mapping[directionMap[input]].visible &&
        !room.mapping[directionMap[input]].locked
      ) {
        return {
          action: "change-room",
          value: room.mapping[directionMap[input]].roomId,
          message: "---",
        };
      } else if (
        room.mapping[directionMap[input]].roomId &&
        room.mapping[directionMap[input]].locked
      ) {
        return {
          action: null,
          value: null,
          message: `That door is locked! You need the ${
            room.mapping[directionMap[input]].keycard
          } to get through ...`,
        };
      } else {
        return {
          action: null,
          value: null,
          message: "There is nothing in that direction",
        };
      }
    }
  } else if (pickUpItems.includes(input)) {
    if (room.inventory.includes(getItemLookup[input])) {
      return {
        action: "get-item",
        value: getItemLookup[input],
        message: `You put the ${getItemLookup[input]} in your bag.`
      }
    } else {
      return {
        action: null,
        value: null,
        message: `There is no ${getItemLookup[input]} in this room ...`
      }
    }
  } else if (input === "not-sure") {
    return {
      action: null,
      value: null,
      message: "I'm not sure what you are trying to do ...",
    };
  } else {
    //todo
    return {
      action: null,
      value: null,
      message: "You gotta make that work!",
    };
  }
};
