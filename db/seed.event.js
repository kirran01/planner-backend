require("dotenv/config");
const { default: mongoose } = require("mongoose");
const Event = require("../models/Event.model");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((mongooseRes) => {
    console.log("connected to -->", mongooseRes.connections[0].name);
    return Event.create({
      name: "from event seed",
      imageUrl: "from event seed",
      eventUrl: "from event seed",
      userEntry: "from event seed",
    });
  })
  .then((createdEvent) => {
    console.log("created event-->", createdEvent);
  })
  .catch((err) => {
    console.log(err, "<--err");
  });
