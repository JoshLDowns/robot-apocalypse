const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  playerId: String,
  name: String,
  maxHealth: Number,
  health: Number,
  inventory: Array,
  attack: String,
  damageBase: Number,
  damageModifier: Number,
  status: mongoose.Schema.Types.Mixed,
  statusTwo: mongoose.Schema.Types.Mixed,
  hasKilled: mongoose.Schema.Types.Mixed,
  abilityOne: mongoose.Schema.Types.Mixed,
  abilityOneSupply: mongoose.Schema.Types.Mixed,
  abilityOneDamage: mongoose.Schema.Types.Mixed,
  abilityOneModifier: mongoose.Schema.Types.Mixed,
  abilityTwo: mongoose.Schema.Types.Mixed,
  abilityTwoSupply: mongoose.Schema.Types.Mixed,
  abilityTwoDamage: mongoose.Schema.Types.Mixed,
  abilityTwoModifier: mongoose.Schema.Types.Mixed,
  abilityThree: mongoose.Schema.Types.Mixed,
  abilityThreeSupply: mongoose.Schema.Types.Mixed,
  abilityThreeDamage: mongoose.Schema.Types.Mixed,
  abilityThreeModifier: mongoose.Schema.Types.Mixed,
  diode: Boolean,
  mapEast: Boolean,
  mapWest: Boolean,
  mapNorth: Boolean,
});

const EnemySchema = new mongoose.Schema({
  name: String,
  health: Number,
  maxHealth: Number,
  attack: String,
  ability: String,
  damageBase: Number,
  damageModifier: Number,
  abilityType: String,
  abilityBase: Number,
  abilityModifier: Number,
  reward: mongoose.Schema.Types.Mixed,
  points: Number,
  postRoomInfo: Array || undefined,
  postRoomInfoAlternate: Array || undefined,
  postRoomInventory: Array || undefined,
  status: mongoose.Schema.Types.Mixed,
});

const MappingSchema = new mongoose.Schema({
  north: {
    roomId: mongoose.Schema.Types.Mixed,
    locked: Boolean,
    visible: Boolean,
    keycard: mongoose.Schema.Types.Mixed,
    secret: mongoose.Schema.Types.Mixed,
  },
  south: {
    roomId: mongoose.Schema.Types.Mixed,
    locked: Boolean,
    visible: Boolean,
    keycard: mongoose.Schema.Types.Mixed,
    secret: mongoose.Schema.Types.Mixed,
  },
  east: {
    roomId: mongoose.Schema.Types.Mixed,
    locked: Boolean,
    visible: Boolean,
    keycard: mongoose.Schema.Types.Mixed,
    secret: mongoose.Schema.Types.Mixed,
  },
  west: {
    roomId: mongoose.Schema.Types.Mixed,
    locked: Boolean,
    visible: Boolean,
    keycard: mongoose.Schema.Types.Mixed,
    secret: mongoose.Schema.Types.Mixed,
  },
});

const RoomSchema = new mongoose.Schema({
  roomId: String,
  name: String,
  info: Array,
  inventory: Array,
  enemy: mongoose.Schema.Types.Mixed,
  mapping: MappingSchema,
  map: mongoose.Schema.Types.Mixed,
  intObject: mongoose.Schema.Types.Mixed,
  intObjectInventory: Array,
  intObjectDescription: mongoose.Schema.Types.Mixed,
  secret: mongoose.Schema.Types.Mixed,
  entered: Boolean,
  interacted: Boolean,
});

const GameSchema = new mongoose.Schema({
  dateStarted: {
    type: Date,
    default: Date.now,
  },
  playerId: String,
  timePlayed: Number,
  score: Number,
  player: PlayerSchema,
  rooms: [RoomSchema],
  currentRoom: {
    type: String,
    default: "bunker",
  },
  gameLog: Array,
  status: String,
});

// const ScoreEntry = new mongoose.Schema({
//   player: String,
//   score: Number,
//   date: Date
// })

module.exports = Game = mongoose.model("games", GameSchema);
