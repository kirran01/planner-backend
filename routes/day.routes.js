const express = require("express");
const router = express.Router();
const {
  getAllDaysController,
  getDayByIdController,
  createDayController,
  deleteDayController,
} = require("../controllers/day.controller");

router.get("/all", getAllDaysController);
router.get("/all/:id", getDayByIdController);
router.post("/create-day", createDayController);
router.delete("/all/:id", deleteDayController);

module.exports = router;
