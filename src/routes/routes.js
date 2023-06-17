const express = require("express");
const childRoutes = require("./child.js");

const router = express.Router();

router.use("/child", childRoutes);

module.exports = router;
