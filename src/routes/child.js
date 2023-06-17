const express = require("express");
const { childController } = require("../controllers/controllers.js");

const router = express.Router();

router.get("/app-usage", childController.getAppUsage);
router.get("/friends", childController.getFriendsInfo);

router.post("/link-parent", childController.linkParent);
router.post("/app-usage", childController.updateAppUsage);

module.exports = router;
