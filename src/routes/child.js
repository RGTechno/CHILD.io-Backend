const express = require("express");
const { childController } = require("../controllers/controllers.js");

const router = express.Router();

router.post("/link-parent", childController.linkParent);

module.exports = router;
