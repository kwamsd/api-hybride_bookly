const router = require("express").Router();
const ctrl = require("../controllers/mixedController");

router.get("/player-full/:id", ctrl.getPlayerFull);

module.exports = router;