const Day = require("../models/Day.model");

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
  res.send(`day id route hit :) and id is ${req.params.id} `);
};

module.exports = { getAllDaysController, getDayByIdController };
