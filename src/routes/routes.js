const express = require("express");
const childRoutes = require("./child.js");
const parentRoutes = require("./parent.js");
const authRoutes = require("./auth.js");

const router = express.Router();

router.use("/child", childRoutes);
router.use("/parent", parentRoutes);
router.use("/auth", authRoutes);

module.exports = router;
