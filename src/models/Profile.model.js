const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  playerId: { type: Number, required: true, unique: true },
  preferences: { type: [String], default: [] },
  history: { type: [Object], default: [] }
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;