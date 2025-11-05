const Team = require("../models/Team.model");

exports.listTeams = async (req, res, next) => {
  try {
    const data = await Team.findAll();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

exports.getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(Number(req.params.id));
    if (!team) return res.status(404).json({ error: "Equipe non trouvée" });
    res.status(200).json(team);
  } catch (e) {
    next(e);
  }
};

exports.createTeam = async (req, res, next) => {
  try {
    const { name, city } = req.body;
    if (!name || !city) return res.status(400).json({ error: "name et city requis" });
    const created = await Team.createOne({ name, city });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

exports.updateTeam = async (req, res, next) => {
  try {
    const updated = await Team.updateOne(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: "Equipe non trouvée" });
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

exports.deleteTeam = async (req, res, next) => {
  try {
    const ok = await Team.deleteOne(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Equipe non trouvée" });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};