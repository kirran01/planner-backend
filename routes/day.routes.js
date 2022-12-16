const express = require("express");
const router = express.Router();
const {
  getAllDaysController,
  getDayByIdController,
} = require("../controllers/day.controller");

router.get("/all", getAllDaysController);

router.get("/all/:id", getDayByIdController);

module.exports = router;
