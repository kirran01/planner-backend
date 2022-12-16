const express = require("express");
const router = express.Router();
const Event = require("../models/Event.model");
const {
  getAllEventsController,
  getEventByIdController,
  updateEventController,
} = require("../controllers/event.controller");

router.get("/all", getAllEventsController);
router.get("/all/:id", getEventByIdController);
router.put("/all/:id", updateEventController);

module.exports = router;
