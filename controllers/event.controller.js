const Event = require("../models/Event.model");
const Day = require("../models/Day.model");

const getAllEventsController = (req, res) => {
  Event.find()
    .then((foundEvents) => {
      res.send(foundEvents);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getEventByIdController = (req, res) => {
  //   res.send(`get event id route @ ${req.params.id}`);
  Event.findById(req.params.id)
    .then((foundEvent) => {
      res.send(foundEvent);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateEventController = (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      eventUrl: req.body.eventUrl,
      imageUrl: req.body.imageUrl,
      userEntry: req.body.userEntry,
    },
    { new: true }
  )
    .then((updatedEvent) => {
      res.send(updatedEvent);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getAllEventsController,
  getEventByIdController,
  updateEventController,
};
