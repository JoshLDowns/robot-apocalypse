
const random = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const generatePlayer = (difficulty, name) => {
  return {
    name: name,
    maxHealth: difficulty === "1" ? 70 : difficulty === "2" ? 60 : 50,
    health: difficulty === "1" ? 70 : difficulty === "2" ? 60 : 50,
    inventory: [],
    log: [{time: new Date().toLocaleTimeString(), input: "Create", message: "Game Created"}],
    attack: "Particle Beam",
    damageBase: 8,
    damageModifier: 6,
    status: undefined,
    status2: undefined,
    hasKilled: false,
    ability1: undefined,
    ability1Supply: undefined,
    ability1Damage: undefined,
    ability1Modifier: undefined,
    ability2: undefined,
    ability2Supply: undefined,
    ability2Base: undefined,
    ability2Modifier: undefined,
    ability3: undefined,
    ability3Supply: undefined,
    ability3Damage: undefined,
    ability3Modifier: undefined,
    bonusRoom1: false,
    diode: false,
    mapEast: false,
    mapWest: false,
    mapNorth: false,
  };
};

class Enemy {
  constructor(
    name,
    health,
    maxHealth,
    attack,
    ability,
    damageBase,
    damageModifier,
    abilityType,
    abilityBase,
    abilityModifier,
    reward,
    points,
    postRoomInfo,
    postRoomInfoAlternate,
    postRoomInventory,
    difficulty
  ) {
    this.name = name;
    this.health =
      difficulty === "1"
        ? health
        : difficulty === "2"
        ? health + 5
        : health + 10;
    this.maxHealth =
      difficulty === "1"
        ? maxHealth
        : difficulty === "2"
        ? maxHealth + 5
        : maxHealth + 10;
    this.attack = attack;
    this.ability = ability;
    this.damageBase = damageBase;
    this.damageModifier = damageModifier;
    this.abilityType = abilityType;
    this.abilityBase = abilityBase;
    this.abilityModifier = abilityModifier;
    this.reward = reward;
    this.points = points;
    this.postRoomInfo = postRoomInfo;
    this.postRoomInfoAlternate = postRoomInfoAlternate;
    this.postRoomInventory = postRoomInventory;
    this.status = undefined;
  }
}

class Room {
  constructor(
    roomId,
    name,
    info,
    inventory,
    enemy,
    mapping,
    map,
    intObject,
    intObjectInventory,
    intObjectDescription,
    secret
  ) {
    this.roomId = roomId;
    this.name = name;
    this.info = info;
    this.inventory = inventory;
    this.enemy = enemy;
    this.mapping = mapping;
    this.map = map;
    this.intObject = intObject;
    this.intObjectInventory = intObjectInventory;
    this.intObjectDescription = intObjectDescription;
    this.secret = secret;
    this.entered = false;
    this.interacted = false;
  }
}

const generateGameState = (difficulty, name, playerId) => {
  const newPlayer = generatePlayer(difficulty, name);

  let enemyW = new Enemy(
    "Robot Sentry",
    50,
    50,
    "Plasma Ray",
    "Static Discharge",
    6,
    9,
    "status_stun",
    undefined,
    undefined,
    "Killswitch Code 1",
    10,
    [
      "The low hum of the servers surrounds you as you stare at what was left of your foe...",
    ],
    [
      "Taking down your first enemy was both empowering and soul crushing...",
      "Your new found power is exhilerating but what have you given up for it?",
      "...",
      "",
      "The low hum of the servers and what is left of your foe surrounds you.",
    ],
    ["Combat Repair Module", "Scrap Metal", "Scrap Metal", "Scrap Metal"],
    difficulty
  );
  let enemyE = new Enemy(
    "Robot Bruiser",
    75,
    75,
    "Pneumatic Fist",
    "Missle Barrage",
    6,
    3,
    "offensive",
    8,
    12,
    "Killswitch Code 2",
    10,
    [
      "The low hum of the servers surrounds you as you stare at what was left of your foe...",
    ],
    [
      "Taking down your first enemy was both empowering and soul crushing...",
      "Your new found power is exhilerating but what have you given up for it?",
      "...",
      "",
      "The low hum of the servers and what is left of your foe surrounds you.",
    ],
    [
      "Missle Launcher",
      "Scrap Metal",
      "Scrap Metal",
      "Scrap Metal",
      "Scrap Metal",
    ],
    difficulty
  );
  let enemyN1 = new Enemy(
    "Mechanical Surveillance Unit",
    125,
    125,
    "Fission Laser",
    "Remote Laser",
    10,
    6,
    "status_dot",
    6,
    3,
    "Office Keycard North",
    15,
    [
      "As the dust settles, you notice that you were surrounded by automated turrets, thankfully defeating this foe seems to have shut them down...",
      "The room is earily quiet.",
    ],
    undefined,
    ["Fission Cannon", "Scrap Metal", "Scrap Metal"],
    difficulty
  );
  let enemyF = new Enemy(
    "Enforcer Captain",
    175,
    175,
    "Collider Beam",
    "Combat Repair",
    12,
    10,
    "defensive",
    14,
    6,
    "Killswitch Code 3",
    25,
    [
      "Your final foe has been defeated",
      "You are so close to your end goal, but you can't help but ask yourself, has destroying your own kind been worth it?",
    ],
    undefined,
    ["Scrap Metal", "Scrap Metal", "Scrap Metal"],
    difficulty
  );
  let enemyRandom = new Enemy(
    "Surveillance Bot",
    35,
    45,
    "Photon Blaster",
    "Combat Repair",
    5,
    5,
    "defensive",
    5,
    5,
    undefined,
    5,
    undefined,
    undefined,
    undefined,
    difficulty
  );
  let enemyRandom2 = new Enemy(
    "Drill Bot",
    20,
    20,
    "Nail Gun",
    "Drill Punch",
    10,
    10,
    "offensive",
    20,
    10,
    undefined,
    5,
    undefined,
    undefined,
    undefined,
    difficulty
  );
  let enemyBonus1 = new Enemy(
    "Imperial Infantry Unit",
    225,
    225,
    "Radioactive Slug",
    "Rail Gun",
    15,
    15,
    "offensive",
    20,
    20,
    "Large Chest",
    50,
    [
      "The parking lot is incredibly silent...",
      "It's a sunny day, but the beautiful weather will never overshadow the ravaged city that surrounds you",
    ],
    undefined,
    ["Scrap Metal", "Scrap Metal", "Repair Kit", "Repair Kit"],
    difficulty
  );
  let enemyB1 = new Enemy(
    "Automated Turret",
    65,
    65,
    "Machine Gun",
    "Plasma Beam",
    12,
    8,
    "offensive",
    10,
    20,
    `${
      random(5) <= 2
        ? "Repair Kit"
        : random(5) <= 2
        ? "Smoke Bomb"
        : random(5) <= 2
        ? "Plasma Grenade"
        : "Scrap Metal"
    }`,
    20,
    [
      "Without the turret, the bright room is eerily quite being so far underground. It doesn't look like you can salvage anything useful from the turret.",
    ],
    undefined,
    ["Scrap Metal", "Scrap Metal"],
    difficulty
  );
  let enemyB2 = new Enemy(
    "Warehouse Guard",
    75,
    75,
    "Solar Ray",
    "Static Discharge",
    12,
    12,
    "status_stun",
    undefined,
    undefined,
    "Basement Keycard",
    25,
    [
      "Now that you have a chance to explore the warehouse, you realize it is mostly full of supplies for organic life forms. There are still some useful items though...",
    ],
    undefined,
    [
      "Repair Kit",
      "Repair Kit",
      "Scrap Metal",
      "Scrap Metal",
      "Portable Shield",
      "Plasma Grenade",
      "Thick Carbon Coating",
      "Thick Carbon Coating",
    ],
    difficulty
  );
  let enemyB3 = new Enemy(
    "Vault Guardian",
    200,
    200,
    "Nuclear Cannon",
    "Remote Laser",
    15,
    15,
    "status_dot",
    10,
    5,
    "Nuclear Fuel Cell",
    40,
    [
      "Your battle with the guard destroyed a good portion of the room!",
      "Fortunately, a few of James' inventions remain untouched, and a small work desk in the corner still stands...",
    ],
    undefined,
    [
      "Scrap Metal",
      "Scrap Metal",
      "Scrap Metal",
      "Regeneration Diode",
      "Graphene Plating",
    ],
    difficulty
  );

  const determineEnemy = (difficulty) => {
    let compNum = random(100);
    let coinFlip = random(2);
    if (difficulty === "1") {
      if (compNum <= 20) {
        return coinFlip === 1 ? enemyRandom : enemyRandom2;
      } else return false;
    }
    if (difficulty === "2") {
      if (compNum <= 30) {
        return coinFlip === 1 ? enemyRandom : enemyRandom2;
      } else return false;
    }
    if (difficulty === "3") {
      if (compNum <= 40) {
        return coinFlip === 1 ? enemyRandom : enemyRandom2;
      } else return false;
    }
  };

  const rooms = [
    new Room(
      "bunker",
      "Fallout Bunker",
      [
        "Ella, as always, is happy to see you...",
        "",
        "'How's everything going?'",
        "'If you have any cool items, type 'craft' to see what we can build!'",
        "",
        "'If you ever get stuck you can type 'Help' for a list of commands!'",
      ],
      [],
      false,
      {
        north: {
          roomId: "RUN_Ent",
          locked: true,
          visible: true,
          keycard: "North Tower Keycard",
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUE_Ent",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUW_Ent",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      undefined,
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUW_Ent",
      "R.U. West Entrance",
      [
        "You stand at the Entrance of the Robotics United Tower West. Everything around the tower is destroyed, yet the tower itself is mostly intact. There is a sign on the door...",
      ],
      [],
      false,
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "bunker",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUW_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "west",
      "Sign",
      [],
      ["Welcome to Robotics United West", "Where Dreams are Born"],
      false
    ),
    new Room(
      "RUW_Welcome",
      "Welcome Desk",
      [
        "Outside of the Circulation Desk looking to be mostly intact, the room has been mostly destroyed and left in a state of disarray. Apparently being welcoming is not something we machines are good at...",
        "At least the directory with a nice map of the tower is still mostly legible.",
      ],
      ["Scrap Metal", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUW_BreakRoom",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUW_Cubicle1",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUW_Ent",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "west",
      "Desk",
      ["Plasma Grenade"],
      [
        "A large half circle shaped desk.  It is pretty damaged from the battle but it looks like you could open one or two of the drawers",
      ],
      false
    ),
    new Room(
      "RUW_BreakRoom",
      "Break Room",
      [
        "As you enter the break room, you are met with a strong musty smell...",
        "Judging by the thick smell of mold and decay, it must have been lunch time when the machines attacked",
      ],
      ["Repair Kit"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUW_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUW_Hallway1N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "west",
      "Refridgerator",
      [],
      [
        "An old refridgerator, no longer functional with it's door partiall open.",
        "The smell in the room seems to be strongest in this area...",
      ],
      false
    ),
    new Room(
      "RUW_Hallway1N",
      "Hallway 1N - W",
      [
        "This side of the building seems to have gotten the worst of the fight. The north wall is mostly destroyed, and the floor is littered with debris.",
      ],
      ["Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUW_FabUnit",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUW_BreakRoom",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUW_ExpLabs",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "west",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUW_ExpLabs",
      "Experimental Arms Lab",
      [
        "It looks like the machines have already cleaned out most of the lab. There might still be something of use here though...",
      ],
      ["Particle Battery", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUW_Hallway1N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "west",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUW_Cubicle1",
      "Cubicle Block One",
      [
        "The room looks like it was a cubicle block at one point, but most of the cubicle walls have been destroyed. There is a mostly in tact desk in the corner.",
      ],
      ["Repair Kit"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUW_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUW_Hallway1S",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "west",
      "Desk",
      [],
      [
        "Out of all the desks in the cubicle block, this looks like the only one that is still in tact...",
      ],
      false
    ),
    new Room(
      "RUW_Hallway1S",
      "Hallway 1S - W",
      [
        "The machines must have barricaded the Emergency Exit on the south wall before their attack... The pile of bones in the room is proof enough of that.",
        "",
        "The barricade is mostly destroyed at this point, but a small explosion might get through it",
      ],
      [],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUW_FabUnit",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUW_ParkingLot",
          locked: true,
          visible: false,
          keycard: false,
          secret:
            "The explosion blows a sizeable hole in the wall ... sunlight fills the room.  As you look outside, you are overcome by a terrible feeling of dread...",
        },
        east: {
          roomId: "RUW_Cubicle1",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUW_Office",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "west",
      false,
      [],
      undefined,
      ["use_grenade", "use_bomb", "use_heatray"]
    ),
    new Room(
      "RUW_Office",
      "R.U. West Office",
      [
        "The office seems to have mostly survived the attack some how. There is a filing cabinet that seems to be unscaythed in the corner. You also notice a strange box underneath the remains of what used to be a desk",
      ],
      ["West Riddle Box"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUW_Hallway1S",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "west",
      "Filing Cabinet",
      ["Portable Shield"],
      [
        "The filing cabinet is mostly in tact. Two of the drawers are locked but one looks to be slightly open",
      ],
      false
    ),
    new Room(
      "RUW_FabUnit",
      "Fabrication Unit West",
      [
        "At one point, specialized parts for various types of medical robots were built here.",
        "At this point, the room only builds fear in what was created here...",
      ],
      ["Thick Carbon Coating", "Scrap Metal", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUW_Hallway1N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUW_Hallway1S",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUW_ServerW",
          locked: true,
          visible: true,
          keycard: "Office Keycard West",
          secret: false,
        },
      },
      "west",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUW_ServerW",
      "Server Room West",
      [
        "Immidiately upon entering the Server Room, you are greeted by a nimble but heavily armed Combat Class Robot.",
        "'INTRUDER DETECTED!!!', It fires a shot that narrowly misses, you spring into action...",
      ],
      [],
      enemyW,
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUW_FabUnit",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "west",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUW_ParkingLot",
      "R.U. West Parking Lot",
      [
        "Stepping out into the sunlight, you hear the pounding of metal feet running towards you...",
        "The sound from the blast must have alarmed some nearby guards. As you look towards the sound, you see a highly advanced combat machine coming at you fast, lets hope you are ready!",
      ],
      [],
      enemyBonus1,
      {
        north: {
          roomId: "RUW_Hallway1S",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "bunker",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "west",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUE_Ent",
      "R.U. East Entrance",
      [
        "Standing at the Entrance of Robotics United Tower East, you can see a giant hole blasted through the building about 10 stories up...",
        "Something big hit this place, at least the sign on the door is ledgible...",
      ],
      [],
      false,
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUE_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "bunker",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "east",
      "Sign",
      [],
      ["Welcome to Robotics United West", "Where Dreams are Reality"],
      false
    ),
    new Room(
      "RUE_Welcome",
      "Welcome Desk",
      [
        "The vaulted ceilings of the once grand welcome lounge have mostly collapsed, leaving a mess of rubble covering most of the room...",
        "The Circulation Desk stoically stands in the middle of the room, almost as if it is proud to have survived the attack...",
        "At least the directory with a nice map of the tower is still mostly legible.",
      ],
      ["Scrap Metal", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUE_Cubicle2",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUE_Charging",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUE_Ent",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "east",
      "Desk",
      ["Repair Kit"],
      [
        "Outside of a thick layer of dust, the large wooden desk seems to be in great shape. There are two locked drawers, but one seems to be unlocked...",
      ],
      false
    ),
    new Room(
      "RUE_Cubicle2",
      "Cubicle Block Two",
      [
        "This building must have been hit last during the attack, as it looks like the people here had time to evacuate.",
        "Most of the cubicle block is still intact, but most the cubicles look like they were cleared out...",
        "While looking around, you notice one desk that looks like it wasn't emptied...",
      ],
      ["Repair Kit"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUE_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUE_Hallway1N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "east",
      "Desk",
      ["Plasma Grenade"],
      [
        "The person that worked in this cubicle must have been home sick that day, everything is still here ...",
      ],
      false
    ),
    new Room(
      "RUE_Hallway1N",
      "Hallway 1N - E",
      [
        "Upon entering the hallway, you see an Employee of the Month picture that somehow survived the attack undamaged hanging on the wall...",
        "The man looked so happy..",
      ],
      ["Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUE_FabUnit",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUE_QA",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUE_Cubicle2",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "east",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUE_QA",
      "Quality Assurance",
      [
        "The QA room is large but mostly empty. Anything of use must have already been salvaged by the machines...",
        "You notice a strange box on one of the tables...",
      ],
      ["East Riddle Box"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUE_Hallway1N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "east",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUE_Charging",
      "Charging Station",
      [
        "This room was used to give new Robots their first initial charge after after being fabricated. As this was a fully automated unit, the room is mostly untouched, and looks just like it did in the past...",
      ],
      ["Repair Kit"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUE_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUE_Hallway1S",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "east",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUE_Hallway1S",
      "Hallway 1S - E",
      [
        "It looks like the humans fought hard in this hallway. Bullet holes cover the walls, and there are two downed robots amongst the bones on the floor.",
        "There is a supply closet on the south wall, but it appears to be locked...",
      ],
      ["Scrap Metal", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUE_FabUnit",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUE_SupplyCloset",
          locked: true,
          visible: true,
          keycard: "Office Keycard East",
          secret: false,
        },
        east: {
          roomId: "RUE_AdvWeapons",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUE_Charging",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "east",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUE_SupplyCloset",
      "Supply Closet",
      [
        "It appears the invaders missed this closet during their sweep, as there are a few potentially useful items amongst the various cleaning and maintenance supplies...",
      ],
      ["Plasma Grenade", "Nuclear Fuel Cell", "Repair Kit"],
      false,
      {
        north: {
          roomId: "RUE_Hallway1S",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "east",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUE_AdvWeapons",
      "Advanced Weapons Lab",
      [
        "This lab was used to research some pretty high tech weapons it seems. There are blueprints scattered across the room.",
        "One for a Nuclear Heat Ray catches your eye...sounds pretty sweet!",
      ],
      ["Particle Battery"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUE_Hallway1S",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "east",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUE_FabUnit",
      "Fabrication Unit East",
      [
        "This Fabrication Unit focused soley on military grade machines. You can tell by the bullet casings that litter the floor, and the large amount of extremely disfigured skeletal remains strewn across the room...",
      ],
      ["Thick Carbon Coating", "Scrap Metal", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUE_Hallway1N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUE_Hallway1S",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUE_ServerE",
          locked: true,
          visible: true,
          keycard: "Office Keycard East",
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "east",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUE_ServerE",
      "Server Room East",
      [
        "Before the door finishes opening, a large fist puts a sizeable dent in it, barely missing you. A big Combat Class Robot with large missile launchers mounted on it's shoulders points at you and yells 'TRAITOR! You must be terminated!",
        "",
        "Looks like you have to fight ...",
      ],
      [],
      enemyE,
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUE_FabUnit",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "east",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_Ent",
      "R.U. North Entrance",
      [
        "Unlike the other two towers, the Robotics United Tower North seems to be in pretty good shape from the outside. The machines must have been worried about destroying the main server computer that resides inside Ella's Dad's office.",
        "I wonder how he would have felt about the sign on the door now...",
      ],
      [],
      false,
      {
        north: {
          roomId: "RUN_WelcomeDesk",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "bunker",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "north",
      "Sign",
      [],
      ["Welcome to Robotics United West", "Where Dreams are our Future"],
      false
    ),
    new Room(
      "RUN_Welcome",
      "Welcome Desk",
      [
        "The outside might have looked like it had avoided the brunt of the machine onslaught, but the inside sure didn't. The room is littered with the remains of both machine and human alike.",
        "The one takeaway from this gruesome sight is that the desks at Robotics United were rock solid, as the one in this welcome area is still standing tall, just like in the other Towers...",
        "Your happy to see that also just like the other towers, the directory with a nice map of the tower is still mostly legible...",
      ],
      ["Scrap Metal", "Scrap Metal", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUN_aiLab",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_Entrance",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_Cubicle3",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_Cubicle4",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "north",
      "Desk",
      ["Thick Carbon Coating"],
      ["These desks truly are impressive, they seem indistructable!"],
      false
    ),
    new Room(
      "RUN_Cubicle3",
      "Cubicle Block Three",
      [
        "Half of the room is completely leveled, as if a bulldozer drove right through the room. There must have been a big fight here. The other side of the room is in disarray, but one cubicle managed to escape unscathed.",
        "Whoever worked there was a huge Hitchhikers Guide to the Galaxy fan, there are posters from the movie all over the cubicle.",
        "",
        "It looks like the computer still works too...",
      ],
      ["Repair Kit"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUN_Hallway1E",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "north",
      "Computer",
      [],
      [
        "Looks like an old Gateway computer ... this person must have been a sucker for nostalgia, I don't see any other reason to own one of those...",
      ],
      false
    ),
    new Room(
      "RUN_Hallway1E",
      "Hallway 1E - N",
      [
        "The walls in this hallway are mostly intact, and are lined with awards celebrating the accomplishments of AI before things went south...",
        "If the machines don't have emotion, why save all of this?",
      ],
      ["Thick Carbon Coating"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUN_AdminOffice",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_Cubicle3",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_aiLab",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "north",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_AdminOffice",
      "Administrative Offices",
      [
        "The machines must have took out the higher ups first, as this room looks like it was cleared before the panic set in.",
        "It looks as if most the room has already been ransacked for supplies, but a lone Filing Cabinet at the back of the office remains untouched...",
      ],
      ["Repair Kit", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_Hallway1E",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_Hallway3N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "north",
      "Filing Cabinet",
      ["Smoke Bomb"],
      [
        "This cabinet probably held a lot of sensitive information as all the drawers but one are locked...",
      ],
      false
    ),
    new Room(
      "RUN_Cubicle4",
      "Cubicle Block 4",
      [
        "This cubicle block seems to have avoided the carnage, as it looks as if the staff had just left for the day. You look around the cubicles and see pictures of friends, family, loved ones...all gone.",
        "You still don't understand these feelings, but you know you don't like them...",
      ],
      ["Particle Battery"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUN_Hallway1W",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "north",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_Hallway1W",
      "Hallway 1W - N",
      [
        "On the west wall of the hallway is a giant framed picture, with a plaque mounted under it. The plaque reads: James Lloyd, Father of all Machines...",
        "There is a single bullet hole in his head...",
      ],
      ["Thick Carbon Coating", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUN_Treasury",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_Cubicle4",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_aiLab",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_SecretStairwell",
          locked: true,
          visible: false,
          keycard: false,
          secret:
            "Upon inspecting the painting, you realize it's actually on hinges! As you swing the painting aside, a locked door with a keypad is revealed",
        },
      },
      "north",
      false,
      [],
      undefined,
      ["move_pic"]
    ),
    new Room(
      "RUN_Treasury",
      "R.U. Treasury",
      [
        "If you had any use for money, you would be one happy camper as the room looked like someone popped a giant confetti launcher that was just full of $100 bills...",
      ],
      ["Repair Kit"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_Hallway1W",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_Hallway3N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "north",
      "Broken Safe",
      ["Particle Battery"],
      [
        "The safe is in pretty rough shape, but the lock mechanism is completely broken ...",
      ],
      false
    ),
    new Room(
      "RUN_aiLab",
      "Artificial Intelligence Laboratory",
      [
        "As you enter the room, it is completely dark...",
        "Suddenly all the lights blast on, and you are met with a machine that looks like a giant turret with arms",
        "'INTRUDER DETECTED, ELIMINATION SEQUENCE INITIATED'",
        "The door slams shut behind you, it appears there is only one way out of this...",
      ],
      [],
      enemyN1,
      {
        north: {
          roomId: "RUN_Hallway3N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_Welcome",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_Hallway1E",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_Hallway1W",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "north",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_Hallway3N",
      "Hallway 3N - N",
      [
        "There must have been a mad dash to get to James' office just north of here. The hall has so much rubble, decimated machines, and skeletal remains that it is hard to walk through...",
      ],
      ["Scrap Metal", "Scrap Metal"],
      determineEnemy(difficulty),
      {
        north: {
          roomId: "RUN_MainServer",
          locked: true,
          visible: true,
          keycard: "Office Keycard North",
          secret: false,
        },
        south: {
          roomId: "RUN_aiLab",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_AdminOffice",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_Treasury",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      "north",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_MainServer",
      "Main Server Room",
      [
        "This is the last room before the office, and you are met with one last foe. You immidiately recognize this Robot. It was the same one that almost ended your time here on what is left of Earth...",
        "Thanks to Ella, you have a shot at revenge!",
      ],
      [],
      enemyF,
      {
        north: {
          roomId: "RUN_PresOffice",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_Hallway3N",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "north",
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_PresOffice",
      "R.U. Presidents Office",
      [
        "Well, you made it...are you ready for this?",
        "You see James' computer in the middle of the office completely untouched by the war.",
        "",
        "There is one more big choice in your journey...",
      ],
      [],
      false,
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_MainServer",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      "north",
      "Computer",
      [],
      [
        "James apparently was a sucker for nostalgia as well, this Lenovo still has an IBM logo on it!",
      ],
      false
    ),
    new Room(
      "RUN_SecretStairwell",
      "Secret Stairwell",
      [
        "Behind the hidden door you find a long, dark stairwell heading deep underground...",
      ],
      [],
      false,
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_Hallway1W",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_BasementLanding",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      false,
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_BasementLanding",
      "Basement Landing",
      [
        "As you reach the bottom of the stairs, bright white lights suddenly switch on and you notice an automated turret on the ceiling...",
        "It looks like it has it's sights on you...",
      ],
      [],
      enemyB1,
      {
        north: {
          roomId: "RUN_BasementHallway",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_SecretStairwell",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: "RUN_FalloutWarehouse",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
      },
      false,
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_FalloutWarehouse",
      "Fallout Warehouse",
      [
        "It looks like James was fully prepared for the fallout, the underground warehouse is huge and filled with enough resources to last a group of people a few years...",
        "It is also apparently well guarded...",
      ],
      [],
      enemyB2,
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: "RUN_BasementLanding",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      false,
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_BasementHallway",
      "Basement Hallway",
      [
        "As you walk down the hallway, you feel a sense of comfort. Nothing is destroyed, there are no holes in the wall",
        "You haven't experienced calm like this in a long time. You are quickly reminded of the times though when you see military supplies piled in the corner...",
        "James was getting ready for anything...",
      ],
      [
        "Repair Kit",
        "Repair Kit",
        "Plasma Grenade",
        "Plasma Grenade",
        "Nuclear Heat Ray",
        "Portable Shield",
      ],
      false,
      {
        north: {
          roomId: "RUN_Vault",
          locked: true,
          visible: true,
          keycard: "Basement Keycard",
          secret: false,
        },
        south: {
          roomId: "RUN_BasementLanding",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      false,
      false,
      [],
      undefined,
      false
    ),
    new Room(
      "RUN_Vault",
      "The Vault",
      [
        "The room is filled with shelves, each littered with their own treasures. James must have used this room to store his most advanced inventions...",
        "He also guarded it well...",
      ],
      [],
      enemyB3,
      {
        north: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        south: {
          roomId: "RUN_BasementHallway",
          locked: false,
          visible: true,
          keycard: false,
          secret: false,
        },
        east: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
        west: {
          roomId: false,
          locked: false,
          visible: false,
          keycard: false,
          secret: false,
        },
      },
      false,
      "Desk",
      ["Letter"],
      [
        "The desk is almost as intricate as the inventions surrounding it, James definitely had an eye for the extravagant",
      ],
      false
    ),
  ];

  return {
    dateStarted: new Date(),
    playerId: playerId,
    timePlayed: 0,
    score: 0,
    player: newPlayer,
    rooms: rooms,
    currentRoom: "bunker",
    gameLog: [],
    status: "new"
  }
};

module.exports = generateGameState;
