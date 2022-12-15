require("dotenv/config");
const Day = require("../models/Day.model");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connectionRes) => {
    console.log("connected to -->", connectionRes.connections[0].name);
    return Day.create({
      day: Date.now(),
    });
  })
  .then((createdDay) => {
    console.log("created day ---->", createdDay);
  })
  .catch((err) => {
    console.log("err--->", err);
  });
