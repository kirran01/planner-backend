require("dotenv/config");
const Day = require("../models/Day.model");
const Event = require("../models/Event.model");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connectionRes) => {
    console.log("connected to -->", connectionRes.connections[0].name);
    return Event.create({
      name: "testforday",
      eventUrl: "testforday",
      imageUrl: "testforday",
      userEntry: "testforday",
    });
  })
  .then((createdEvent) => {
    console.log("created event for day test --->", createdEvent);
    return Day.create({
      day: Date.now(),
      events: createdEvent._id,
    });
  })
  .then((createdDay) => {
    console.log("created Day--->", createdDay);
    return Day.findByIdAndUpdate(createdDay.events, {
      $push: {
        events: createdDay._id,
      },
      new: true,
    });
  })
  .then()
  .catch((err) => {
    console.log("err--->", err);
  });
