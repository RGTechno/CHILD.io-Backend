const express = require("express");
const { childController } = require("../controllers/controllers.js");
const friendRoutes = require("./friend.js");

const router = express.Router();

router.use("/friends", friendRoutes);

router.get("/app-usage", childController.getAppUsage);

router.post("/link-parent", childController.linkParent);
router.post("/app-usage", childController.updateAppUsage);

module.exports = router;
