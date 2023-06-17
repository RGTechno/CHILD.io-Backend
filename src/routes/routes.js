const express = require("express");
const childRoutes = require("./child.js");
const parentRoutes = require("./parent.js");

const router = express.Router();

router.use("/child", childRoutes);
router.use("/parent", parentRoutes);

module.exports = router;
