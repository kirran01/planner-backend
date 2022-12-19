const express = require("express");
const router = express.Router();
const {
  loginController,
  signupController,
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/verify", isAuthenticated, (req, res) => {
  console.log(req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
