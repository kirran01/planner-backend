const Event = require("../models/Event.model");
const Day = require("../models/Day.model");

const createEventController = (req, res) => {
  console.log(req.body, "<-----");
  Day.findById(req.body.dayId)
    .then((foundDay) => {
      if (!foundDay) {
        return Day.create({
          day: Date.now(),
          quote: "testing @ 715",
        });
      }
      return foundDay;
    })
    .then((createdOrFoundDay) => {
      return Event.create({
        name: req.body.name,
        eventUrl: req.body.eventUrl,
        imageUrl: req.body.imageUrl,
        userEntry: req.body.userEntry,
        dayId: createdOrFoundDay._id,
      });
    })
    .then((createdEvent) => {
      return Day.findByIdAndUpdate(
        createdEvent.dayId,
        {
          $push: {
            myEvents: createdEvent._id,
          },
        },
        { new: true }
      ).then((updatedDay) => {
        return createdEvent;
      });
    })
    .then((createdEvent) => {
      res.send(createdEvent);
    })
    .catch((err) => {
      res.send(err);
    });
};

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

const deleteEventController = (req, res) => {
  Event.findOneAndDelete(req.params.id)
    .then((deletedEvent) => {
      return Day.findByIdAndUpdate(
        deletedEvent.dayId,
        {
          $pull: {
            myEvents: deletedEvent._id,
          },
        },
        { new: true }
      );
    })
    .then((updatedDay) => {
      res.send(updatedDay);
    })

    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getAllEventsController,
  getEventByIdController,
  updateEventController,
  deleteEventController,
  createEventController,
};
