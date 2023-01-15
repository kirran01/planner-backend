const express = require("express");
const router = express.Router();
const {
  loginController,
  signupController,
  editUserController,
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.put("/edit-user", isAuthenticated, editUserController);
router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = router;
