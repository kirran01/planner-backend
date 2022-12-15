require("dotenv/config");
const { default: mongoose } = require("mongoose");
const Event = require("../models/Event.model");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((mongooseRes) => {
    console.log("connected to -->", mongooseRes.connections[0].name);
    return Event.create({
      name: "event1",
      imageUrl: "event1",
      eventUrl: "event1",
      userEntry: "event1",
    });
  })
  .then((createdEvent) => {
    console.log("created event-->", createdEvent);
  })
  .catch((err) => {
    console.log(err, "<--err");
  });
