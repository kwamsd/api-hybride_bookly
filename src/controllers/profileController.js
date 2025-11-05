const Profile = require("../models/Profile.model");

exports.getProfile = async (req, res, next) => {
  try {
    const p = await Profile.findOne({ playerId: Number(req.params.playerId) });
    if (!p) return res.status(404).json({ error: "Profil non trouvé" });
    res.status(200).json(p);
  } catch (e) {
    next(e);
  }
};

exports.createProfile = async (req, res, next) => {
  try {
    const { playerId, preferences, history } = req.body;
    if (!playerId) return res.status(400).json({ error: "playerId requis" });
    const p = new Profile({ playerId, preferences: preferences || [], history: history || [] });
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (e) {
    next(e);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const playerId = Number(req.params.playerId);
    const updated = await Profile.findOneAndUpdate({ playerId }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Profil non trouvé" });
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};