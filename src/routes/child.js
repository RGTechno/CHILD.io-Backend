const express = require("express");
const { childController } = require("../controllers/controllers.js");

const router = express.Router();

router.get("/app-usage", childController.getAppUsage);
router.get("/friends", childController.getFriendsInfo);

router.post("/link-parent", childController.linkParent);
router.post("/app-usage", childController.updateAppUsage);
router.post("/add-friend", childController.sendFriendRequest);
router.post("/accept-friend", childController.acceptFriendRequest);

module.exports = router;
