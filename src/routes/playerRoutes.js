const router = require("express").Router();
const ctrl = require("../controllers/playerController");

router.get("/", ctrl.listPlayers);
router.get("/:id", ctrl.getPlayer);
router.post("/", ctrl.createPlayer);
router.put("/:id", ctrl.updatePlayer);
router.delete("/:id", ctrl.deletePlayer);

module.exports = router;