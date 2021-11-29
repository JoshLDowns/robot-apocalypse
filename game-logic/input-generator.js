class ValidInput {
  constructor() {
    this.affirmative = [
      "YES",
      "YEAH",
      "YUP",
      "YUPPER",
      "MHM",
      "MMHMM",
      "AFFIRMATIVE",
    ];
    this.negatory = ["NO", "NOPE", "NADA", "NEGATORY"];
    this.direction = [
      "GO",
      "TRAVEL",
      "LEAVE",
      "EXIT",
      "N",
      "NORTH",
      "S",
      "SOUTH",
      "E",
      "EAST",
      "W",
      "WEST",
      "INSIDE",
      "IN",
      "DOWNSTAIRS",
      "DOWN",
    ];
    this.inventory = ["B", "INVENTORY", "BAG", "BACKPACK"];
    this.status = ["STATUS", "INFO", "HP", "HEALTH"];
    this.inspect = [
      "INSPECT",
      "EXAMINE",
      "ROOM",
      "LOOK",
      "AROUND",
      "EXPLORE",
      "SEARCH",
      "FIND",
    ];
    this.instructions = [
      "D",
      "DIRECTIONS",
      "INSTRUCTIONS",
      "INST",
      "HOW",
      "PLAY",
      "HELP",
    ];
    this.pickUpItem = ["PICK UP", "PICK", "GRAB", "GET", "TAKE", "AQUIRE"];
    this.useItem = ["USE"];
    this.combat = ["ATTACK", "FIGHT", "THROW", "SHOOT", "FIRE"];
    this.items = [
      "KIT",
      "METAL",
      "BATTERY",
      "COATING",
      "BOX",
      "GRENADE",
      "SHIELD",
      "BOMB",
      "CELL",
      "NUCLEAR",
      "RAY",
      "ALL",
      "LAUNCHER",
      "MODULE",
      "CANNON",
      "LETTER",
      "PLATING",
      "DIODE",
    ];
    this.otherActions = [
      "DROP",
      "THROW",
      "FART",
      "LAUGH",
      "LOL",
      "HUG",
      "READ",
      "OPEN",
      "RUN",
      "CHECK",
      "LOG",
    ];
    this.intObjects = [
      "SIGN",
      "DESK",
      "COMPUTER",
      "CABINET",
      "FRIDGE",
      "REFRIDGERATOR",
      "SAFE",
      "MAP",
      "M",
      "DIRECTORY",
      "PAINTING",
      "PICTURE",
      "PORTRAIT",
    ];
    this.falloutBunkerEvent = ["REPAIR", "FIX", "KEYCARD", "KEY", "CRAFT"];
    this.validInputs = [
      ...this.affirmative,
      ...this.negatory,
      ...this.direction,
      ...this.inventory,
      ...this.status,
      ...this.inspect,
      ...this.instructions,
      ...this.useItem,
      ...this.pickUpItem,
      ...this.combat,
      ...this.items,
      ...this.otherActions,
      ...this.intObjects,
      ...this.falloutBunkerEvent,
    ];
  }
  //checks validity of word
  validWord(word) {
    return this.validInputs.includes(word);
  }

  getFirstLast(string) {
    const firstWord =
      string.indexOf(" ") === -1
        ? string.toUpperCase()
        : string.slice(0, string.indexOf(" ")).toUpperCase();
    const lastWord =
      string.indexOf(" ") === -1
        ? string.toUpperCase()
        : string.slice(string.lastIndexOf(" ") + 1).toUpperCase();
    if (!this.validWord(firstWord) && !this.validWord(lastWord)) {
      return false;
    } else {
      return {
        firstWord: firstWord,
        lastWord: lastWord,
      };
    }
  }
  //determines the return output of each valid entry
  returnInput(obj) {
    console.log(obj);
    if (
      this.affirmative.includes(obj.firstWord) ||
      this.affirmative.includes(obj.lastWord)
    ) {
      return "y";
    } else if (
      this.negatory.includes(obj.firstWord) ||
      this.negatory.includes(obj.lastWord)
    ) {
      return "n";
    } else if (
      this.inventory.includes(obj.firstWord) ||
      this.inventory.includes(obj.lastWord)
    ) {
      return "i";
    } else if (
      this.status.includes(obj.firstWord) ||
      this.status.includes(obj.lastWord)
    ) {
      return "s";
    } else if (
      this.inspect.includes(obj.firstWord) ||
      this.inspect.includes(obj.lastWord)
    ) {
      if (this.inspect.includes(obj.firstWord)) {
        if (obj.lastWord === "BOX") {
          return "use_rbox";
        } else if (obj.lastWord === "SIGN") {
          return "read_sign";
        } else if (obj.lastWord === "MAP" || obj.lastWord === "DIRECTORY") {
          return "read_map";
        } else if (obj.lastWord === "DESK") {
          return "open_desk";
        } else if (obj.lastWord === "CABINET") {
          return "open_cabinet";
        } else if (
          obj.lastWord === "FRIDGE" ||
          obj.lastWord === "REFRIDGERATOR"
        ) {
          return "open_fridge";
        } else if (obj.lastWord === "SAFE") {
          return "open_safe";
        } else if (obj.lastWord === "CHEST") {
          return "use_chest";
        } else if (obj.lastWord === "LETTER") {
          return "read_letter";
        } else if (
          obj.lastWord === "PAINTING" ||
          obj.lastWord === "PICTURE" ||
          obj.lastWord === "PORTRAIT"
        ) {
          return "move_pic";
        } else if (obj.lastWord === "ROOM") {
          return "insp";
        } else if (obj.firstWord === "LOOK" && obj.lastWord === "AROUND") {
          return "insp";
        } else if (obj.lastWord === "INSPECT") {
          return "insp";
        } else if (obj.lastWord === "LOG") {
          return "toggle_log";
        } else {
          return "not_sure";
        }
      } else if (obj.firstWord === "CHECK" && obj.lastWord === "ROOM") {
        return "insp";
      } else if (
        !this.inspect.includes(obj.firstWord) &&
        this.inspect.includes(obj.lastWord) &&
        obj.firstWord !== "INSPEC" &&
        obj.firstWord !== "EXAMIN" &&
        obj.firstWord !== "EXPLOR" &&
        obj.firstWord !== "SEARC" &&
        obj.firstWord !== "FIN"
      ) {
        return "not_sure";
      } else {
        return "insp";
      }
    } else if (
      this.falloutBunkerEvent.includes(obj.firstWord) ||
      this.falloutBunkerEvent.includes(obj.lastWord)
    ) {
      return "fob_craft";
    } else if (obj.firstWord === "OPEN" || obj.lastWord === "OPEN") {
      if (obj.lastWord === "DESK") {
        return "open_desk";
      } else if (obj.lastWord === "CABINET") {
        return "open_cabinet";
      } else if (
        obj.lastWord === "FRIDGE" ||
        obj.lastWord === "REFRIDGERATOR"
      ) {
        return "open_fridge";
      } else if (obj.lastWord === "SAFE") {
        return "open_safe";
      } else if (obj.lastWord === "BOX") {
        return "use_rbox";
      } else if (obj.lastWord === "CHEST") {
        return "use_chest";
      } else if (obj.lastWord === "LOG") {
        return "toggle_log";
      } else {
        return "open_null";
      }
    } else if (obj.firstWord === "READ" || obj.lastWord === "READ") {
      if (obj.lastWord === "BOX") {
        return "use_rbox";
      } else if (obj.lastWord === "SIGN") {
        return "read_sign";
      } else if (obj.lastWord === "MAP" || obj.lastWord === "DIRECTORY") {
        return "read_map";
      } else if (obj.lastWord === "LETTER") {
        return "read_letter";
      } else {
        return "read_null";
      }
    } else if (
      this.pickUpItem.includes(obj.firstWord) &&
      this.intObjects.includes(obj.lastWord)
    ) {
      if (obj.lastWord === "CABINET") {
        return "no_pu_cabinet";
      } else if (obj.lastWord === "DESK") {
        return "no_pu_desk";
      } else if (obj.lastWord === "COMPUTER") {
        return "no_pu_comp";
      } else if (obj.lastWord === "SAFE") {
        return "no_pu_safe";
      } else if (obj.lastWord === "SIGN") {
        return "no_pu_sign";
      } else if (obj.lastWord === "FRIDGE") {
        return "no_pu_fridge";
      } else if (obj.lastWord === "REFRIDGERATOR") {
        return "no_pu_fridge";
      } else {
        return "no_pickup";
      }
    } else if (obj.firstWord === "DROP" || obj.lastWord === "DROP") {
      if (obj.lastWord === "BATTERY") {
        return "drop_particlebattery";
      } else if (obj.lastWord === "COATING") {
        return "drop_carboncoating";
      } else if (obj.lastWord === "KIT") {
        return "drop_repairkit";
      } else if (obj.lastWord === "BOX") {
        return "drop_rbox";
      } else if (obj.lastWord === "GRENADE") {
        return "drop_grenade";
      } else if (obj.lastWord === "SHIELD") {
        return "drop_shield";
      } else if (obj.lastWord === "BOMB") {
        return "drop_bomb";
      } else if (obj.lastWord === "METAL") {
        return "drop_scrapmetal";
      } else if (obj.lastWord === "CELL") {
        return "drop_fuelcell";
      } else if (obj.lastWord === "RAY") {
        return "drop_heatray";
      } else if (obj.lastWord === "LAUNCHER") {
        return "drop_launcher";
      } else if (obj.lastWord === "MODULE") {
        return "drop_module";
      } else if (obj.lastWord === "CANNON") {
        return "drop_cannon";
      } else if (obj.lastWord === "CHEST") {
        return "drop_chest";
      } else if (obj.lastWord === "EMP") {
        return "drop_emp";
      } else if (obj.lastWord === "DIODE") {
        return "drop_diode";
      } else if (obj.lastWord === "PLATING") {
        return "drop_plating";
      } else if (obj.lastWord === "LETTER") {
        return "drop_letter";
      } else {
        return "drop_null";
      }
    } else if (
      this.direction.includes(obj.firstWord) ||
      this.direction.includes(obj.lastWord)
    ) {
      if (
        obj.firstWord === "NORTH" ||
        obj.lastWord === "NORTH" ||
        obj.firstWord === "N" ||
        obj.lastWord === "N"
      ) {
        return "dn";
      } else if (
        obj.firstWord === "SOUTH" ||
        obj.lastWord === "SOUTH" ||
        obj.firstWord === "S" ||
        obj.lastWord === "S"
      ) {
        return "ds";
      } else if (
        obj.firstWord === "EAST" ||
        obj.lastWord === "EAST" ||
        obj.firstWord === "E" ||
        obj.lastWord === "E"
      ) {
        return "de";
      } else if (
        obj.firstWord === "WEST" ||
        obj.lastWord === "WEST" ||
        obj.firstWord === "W" ||
        obj.lastWord === "W"
      ) {
        return "dw";
      } else if (
        obj.firstWord === "INSIDE" ||
        obj.lastWord === "INSIDE" ||
        obj.firstWord === "IN" ||
        obj.lastWord === "IN"
      ) {
        return "di";
      } else if (
        obj.firstWord === "DOWNSTAIRS" ||
        obj.lastWord === "DOWNSTAIRS" ||
        obj.firstWord === "DOWN" ||
        obj.lastWord === "DOWN"
      ) {
        return "dd";
      } else {
        return "dnull";
      }
    } else if (
      obj.firstWord === "MAP" ||
      obj.lastWord === "MAP" ||
      obj.firstWord === "M" ||
      obj.lastWord === "M"
    ) {
      return "read_map";
    } else if (obj.firstWord === "USE" || obj.lastWord === "USE") {
      if (obj.lastWord === "BATTERY") {
        return "use_particlebattery";
      } else if (obj.lastWord === "COATING") {
        return "use_carboncoating";
      } else if (obj.lastWord === "KIT") {
        return "use_repairkit";
      } else if (obj.lastWord === "BOX") {
        return "use_rbox";
      } else if (obj.lastWord === "GRENADE") {
        return "use_grenade";
      } else if (obj.lastWord === "SHIELD") {
        return "use_shield";
      } else if (obj.lastWord === "BOMB") {
        return "use_bomb";
      } else if (obj.lastWord === "METAL" || obj.lastWord === "CELL") {
        return "no_use";
      } else if (obj.lastWord === "COMPUTER") {
        return "use_comp";
      } else if (obj.lastWord === "RAY") {
        return "use_heatray";
      } else if (obj.lastWord === "EMP") {
        return "use_emp";
      } else if (obj.lastWord === "CHEST") {
        return "use_chest";
      } else if (obj.lastWord === "PLATING") {
        return "use_plating";
      } else if (obj.lastWord === "LETTER") {
        return "read_letter";
      } else if (obj.lastWord === "MAP") {
        return "read_map";
      } else {
        return "use_null";
      }
    } else if (obj.firstWord === "CHECK" || obj.lastWord === "CHECK") {
      if (obj.lastWord === "DESK") {
        return "open_desk";
      } else if (obj.lastWord === "CABINET") {
        return "open_cabinet";
      } else if (
        obj.lastWord === "FRIDGE" ||
        obj.lastWord === "REFRIDGERATOR"
      ) {
        return "open_fridge";
      } else if (obj.lastWord === "SAFE") {
        return "open_safe";
      } else if (obj.lastWord === "MAP" || obj.lastWord === "DIRECTORY") {
        return "read_map";
      } else if (obj.lastWord === "BOX") {
        return "use_rbox";
      } else if (obj.lastWord === "SIGN") {
        return "read_sign";
      } else if (obj.lastWord === "CHEST") {
        return "use_chest";
      } else if (
        obj.lastWord === "PAINTING" ||
        obj.lastWord === "PICTURE" ||
        obj.lastWord === "PORTRAIT"
      ) {
        return "move_pic";
      } else if (obj.lastWord === "LETTER") {
        return "read_letter";
      } else if (obj.lastWord === "LOG") {
        return "toggle_log";
      } else {
        return "check_null";
      }
    } else if (
      this.combat.includes(obj.firstWord) ||
      this.combat.includes(obj.lastWord)
    ) {
      if (obj.firstWord === "THROW" || obj.lastWord === "THROW") {
        if (obj.lastWord === "GRENADE") {
          return "use_grenade";
        } else if (obj.lastWord === "BOMB") {
          return "use_bomb";
        } else if (obj.lastWord === "METAL") {
          return "throw_metal";
        } else if (obj.lastWord === "EMP") {
          return "use_emp";
        } else {
          return "throw_null";
        }
      } else if (obj.firstWord === "SHOOT" && obj.lastWord === "RAY") {
        return "use_heatray";
      } else if (obj.firstWord === "FIRE" && obj.lastWord === "RAY") {
        return "use_heatray";
      } else {
        return "combat";
      }
    } else if (
      (this.pickUpItem.includes(obj.firstWord) ||
        this.items.includes(obj.firstWord) ||
        this.items.includes(obj.lastWord)) &&
      !this.otherActions.includes(obj.firstWord)
    ) {
      if (obj.firstWord === "METAL" || obj.lastWord === "METAL") {
        return "pu_scrapmetal";
      } else if (obj.firstWord === "BATTERY" || obj.lastWord === "BATTERY") {
        return "pu_particlebattery";
      } else if (obj.firstWord === "COATING" || obj.lastWord === "COATING") {
        return "pu_carboncoating";
      } else if (obj.firstWord === "KIT" || obj.lastWord === "KIT") {
        return "pu_repairkit";
      } else if (obj.firstWord === "BOX" || obj.lastWord === "BOX") {
        return "pu_rbox";
      } else if (obj.firstWord === "GRENADE" || obj.lastWord === "GRENADE") {
        return "pu_grenade";
      } else if (obj.firstWord === "SHIELD" || obj.lastWord === "SHIELD") {
        return "pu_shield";
      } else if (obj.firstWord === "BOMB" || obj.lastWord === "BOMB") {
        return "pu_bomb";
      } else if (
        obj.firstWord === "NUCLEAR" ||
        obj.firstWord === "CELL" ||
        obj.lastWord === "NUCLEAR" ||
        obj.lastWord === "CELL"
      ) {
        return "pu_fuelcell";
      } else if (obj.firstWord === "RAY" || obj.lastWord === "RAY") {
        return "pu_heatray";
      } else if (obj.firstWord === "LAUNCHER" || obj.lastWord === "LAUNCHER") {
        return "pu_launcher";
      } else if (obj.firstWord === "MODULE" || obj.lastWord === "MODULE") {
        return "pu_module";
      } else if (obj.firstWord === "CANNON" || obj.lastWord === "CANNON") {
        return "pu_cannon";
      } else if (obj.firstWord === "ALL" || obj.lastWord === "ALL") {
        return "pu_all";
      } else if (obj.firstWord === "CHEST" || obj.lastWord === "CHEST") {
        return "pu_chest";
      } else if (obj.firstWord === "EMP" || obj.lastWord === "EMP") {
        return "pu_emp";
      } else if (obj.firstWord === "PLATING" || obj.lastWord === "PLATING") {
        return "pu_plating";
      } else if (obj.firstWord === "DIODE" || obj.lastWord === "DIODE") {
        return "pu_diode";
      } else if (obj.firstWord === "LETTER" || obj.lastWord === "LETTER") {
        return "pu_letter";
      } else {
        return "pu_null";
      }
    } else if (obj.firstWord === "LOG" || obj.lastWord === "LOG") {
      return "toggle_log";
    } else if (
      this.instructions.includes(obj.firstWord) ||
      this.instructions.includes(obj.lastWord)
    ) {
      return "d";
    } else if (
      this.otherActions.includes(obj.firstWord) ||
      this.otherActions.includes(obj.lastWord)
    ) {
      return "no_do";
      //add other actions here .... this is where some easter eggs would go, and some silly inputs if I have time
    } else {
      return "not_sure";
    }
  }
}

module.exports = ValidInput;
