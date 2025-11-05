const router = require("express").Router();
const ctrl = require("../controllers/teamController");

router.get("/", ctrl.listTeams);
router.get("/:id", ctrl.getTeam);
router.post("/", ctrl.createTeam);
router.put("/:id", ctrl.updateTeam);
router.delete("/:id", ctrl.deleteTeam);

module.exports = router;