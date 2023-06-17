const express = require("express");
const { childController } = require("../controllers/controllers.js");

const router = express.Router();

router.post("/link-parent", childController.linkParent);
router.get("/app-usage", childController.getAppUsage);
router.post("/app-usage", childController.updateAppUsage);

module.exports = router;
