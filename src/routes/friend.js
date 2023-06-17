const express = require("express");
const { friendController } = require("../controllers/controllers.js");

const router = express.Router();

router.get("/", friendController.getFriendsInfo);
router.post("/add", friendController.sendFriendRequest);
router.post("/accept", friendController.acceptFriendRequest);

module.exports = router;
