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

const generateRoomInventoryString = (room) => {
  let currentString;
  let currentInventory = [...room.inventory];
  currentInventory.sort();
  let itemCount = 1;
  if (currentInventory.length === 0 && !room.intObject) {
    return "After searching the area, you don't find anything of use.";
  } else if (currentInventory.length > 0 && !room.intObject) {
    currentString = "Upon searching the room, you find the following items: ";
    for (let i = 0; i < currentInventory.length; i++) {
      if (currentInventory[i] !== currentInventory[i + 1]) {
        currentString +=
          itemCount === 1
            ? `${currentInventory[i]}${
                currentInventory.length - 1 === i ? "" : ", "
              }`
            : `${itemCount} ${currentInventory[i]}${
                currentInventory.length - 1 === i ? "" : ", "
              }`;
        itemCount = 1;
      } else {
        itemCount += 1;
      }
    }
    return currentString + ".";
  } else if (currentInventory.length > 0 && room.intObject) {
    currentString = "Upon searching the room, you find the following items: ";
    for (let i = 0; i < currentInventory.length; i++) {
      if (currentInventory[i] !== currentInventory[i + 1]) {
        currentString +=
          itemCount === 1
            ? `${currentInventory[i]}${
                currentInventory.length - 1 === i ? "" : ", "
              }`
            : `${itemCount} ${currentInventory[i]}${
                currentInventory.length - 1 === i ? "" : ", "
              }`;
        itemCount = 1;
      } else {
        itemCount += 1;
      }
    }
    return currentString + `.  There is also a ${room.intObject} in the room.`;
  } else if (currentInventory.length === 0 && room.intObject) {
    return `Upon searching the room, you don't find anything of use, but you do notice a ${room.intObject} in the room.`;
  }
};

export const determineAction = (input, room, player) => {
  if (input === "insp") {
    return {
      action: null,
      value: null,
      message: generateRoomInventoryString(room),
    };
  } else if (directionArray.includes(input)) {
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
    //TODO handle riddle boxes!
    if (room.inventory.includes(getItemLookup[input])) {
      return {
        action: "get-item",
        value: getItemLookup[input],
        message: `You put the ${getItemLookup[input]} in your bag.`,
      };
    } else {
      return {
        action: null,
        value: null,
        message: `There is no ${getItemLookup[input]} in this room ...`,
      };
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
