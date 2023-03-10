const Day = require("../models/Day.model");
const Event = require("../models/Event.model");

const getAllDaysController = (req, res) => {
  Day.find()
    .populate("myEvents")
    .then((allDays) => {
      res.send(allDays);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getDayByIdController = (req, res) => {
  Day.findById(req.params.id)
    .populate("myEvents")
    .then((foundDay) => {
      res.send(foundDay);
    })
    .catch((err) => {
      res.send(err);
    });
};

const createDayController = (req, res) => {
  Day.create({
    day: new Date(req.body.day),
    quote: req.body.quote,
    owner: req.payload._id,
  })
    .then((createdDay) => {
      res.send(createdDay);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteDayController = (req, res) => {
  Day.findByIdAndDelete(req.params.id)
    .then((deletedDay) => {
      const query = { dayId: req.params.id };
      return Event.deleteMany(query).then((deletedEvents) => {
        res.send("successfully deleted");
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateDayController = (req, res) => {
  Day.findByIdAndUpdate(
    req.params.id,
    {
      day: req.body.day,
      quote: req.body.quote,
      myEvents: req.body.event,
    },
    { new: true }
  )
    .then((updatedDay) => {
      res.send(updatedDay);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getAllDaysController,
  getDayByIdController,
  createDayController,
  deleteDayController,
  updateDayController,
};
