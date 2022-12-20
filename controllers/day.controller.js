const Day = require("../models/Day.model");
const Event = require("../models/Event.model");

const getAllDaysController = (req, res) => {
  Day.find()
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
    day: Date.now(),
    quote: req.body.quote,
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
      res.send(deletedDay);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateDayController = (req, res) => {
  // res.send("day put route hit");
  Day.findByIdAndUpdate(
    req.params.id,
    {
      customDay:req.body.customDay,
      quote: req.body.quote,
      myEvents:req.body.event

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
