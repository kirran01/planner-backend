const express = require("express");
const router = express.Router();
const Event = require("../models/Event.model");
const {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
  deleteEventController,
} = require("../controllers/event.controller");
const{isAuthenticated}=require('../middleware/jwt.middleware')

router.post("/create-event",isAuthenticated, createEventController);
router.get("/all", getAllEventsController);
router.get("/all/:id", getEventByIdController);
router.put("/all/:id", updateEventController);
router.delete("/all/:id", deleteEventController);

module.exports = router;
