const Player = require("../models/Player.model");
const Profile = require("../models/Profile.model");

exports.getPlayerFull = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const player = await Player.findById(id);
    if (!player) return res.status(404).json({ error: "Joueur non trouvé" });
    const profile = await Profile.findOne({ playerId: id });
    res.status(200).json({ player, profile: profile || null });
  } catch (e) {
    next(e);
  }
};