const Player = require("../models/Player.model");

exports.listPlayers = async (req, res, next) => {
  try {
    const { q, teamId, limit, offset } = req.query;
    const data = await Player.findAll({ q, teamId, limit, offset });
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

exports.getPlayer = async (req, res, next) => {
  try {
    const p = await Player.findById(Number(req.params.id));
    if (!p) return res.status(404).json({ error: "Joueur non trouvé" });
    res.status(200).json(p);
  } catch (e) {
    next(e);
  }
};

exports.createPlayer = async (req, res, next) => {
  try {
    const { name, position, team_id } = req.body;
    if (!name || !position) return res.status(400).json({ error: "name et position requis" });
    const created = await Player.createOne({ name, position, team_id: team_id || null });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

exports.updatePlayer = async (req, res, next) => {
  try {
    const updated = await Player.updateOne(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: "Joueur non trouvé" });
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

exports.deletePlayer = async (req, res, next) => {
  try {
    const ok = await Player.deleteOne(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Joueur non trouvé" });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};