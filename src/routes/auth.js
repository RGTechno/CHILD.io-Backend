const express = require("express");
const { authController } = require("../controllers/controllers.js");
const friendRoutes = require("./friend.js");

const router = express.Router();

router.use("/register", authController.registerUser);

module.exports = router;
