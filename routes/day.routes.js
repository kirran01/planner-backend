const express = require("express");
const router = express.Router();
const {
  getAllDaysController,
  getDayByIdController,
  createDayController,
  deleteDayController,
  updateDayController,
} = require("../controllers/day.controller");

router.get("/all", getAllDaysController);
router.get("/all/:id", getDayByIdController);
router.post("/create-day", createDayController);
router.delete("/all/:id", deleteDayController);
router.put("/all/:id", updateDayController);

module.exports = router;
