require("dotenv/config");
const Day = require("../models/Day.model");
const Event = require("../models/Event.model");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connectionRes) => {
    console.log("connected to -->", connectionRes.connections[0].name);
    return Day.create({
      day: Date.now(),
      quote:"from day seed"
    });
  })
  .then((createdDay) => {
    console.log("created event for day test --->", createdDay);

    return Event.create({
      name: "event within day seed",
      eventUrl: "event within day seed",
      imageUrl: "event within day seed",
      userEntry: "event within day seed",
      dayId: createdDay._id,
    });
  })
  //?
  .then((createdEvent) => {
    return Day.findByIdAndUpdate(
      createdEvent.dayId,
      {
        $push: {
          myEvents: createdEvent._id,
        },
      },
      { new: true }
    );
  })
  .then((updatedEvent) => console.log(updatedEvent))
  .catch((err) => {
    console.log("err--->", err);
  });
