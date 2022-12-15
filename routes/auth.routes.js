const express = require("express");
const router = express.Router();
const {
  loginController,
  signupController,
} = require("../controllers/auth.controller");

router.post("/login", loginController);

router.post("/signup", signupController);

module.exports = router;
