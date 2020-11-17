const mongoose = require("mongoose");

const ThirdPartyProviderSchema = new mongoose.Schema({
  provider_name: {
    type: String,
    default: null,
  },
  provider_id: {
    type: String,
    default: null,
  },
  provider_data: {
    type: {},
    default: null,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  active_game: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
  third_party_auth: [ThirdPartyProviderSchema],
  date: {
    type: Date,
    default: Date.now
  }
}, {strict: false})

module.exports = User = mongoose.model("users", UserSchema);