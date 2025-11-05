const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectPG } = require("./config/db.postgres");
const { connectMongo } = require("./config/db.mongo");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const profileRoutes = require("./routes/profileRoutes");
const mixedRoutes = require("./routes/mixedRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectPG();
connectMongo();

app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api", mixedRoutes);

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route inconnue" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Erreur interne serveur" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});