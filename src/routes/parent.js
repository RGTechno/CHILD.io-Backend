const express = require("express");
const { parentController } = require("../controllers/controllers.js");

const router = express.Router();

router.post("/incentivise-child", parentController.incentiviseChild);

module.exports = router;
