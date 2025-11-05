const router = require("express").Router();
const ctrl = require("../controllers/profileController");

router.get("/:playerId", ctrl.getProfile);
router.post("/", ctrl.createProfile);
router.put("/:playerId", ctrl.updateProfile);

module.exports = router;