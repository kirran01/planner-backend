require("dotenv/config");
const { default: mongoose } = require("mongoose");
const Event = require("../models/Event.model");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((mongooseRes) => {
    console.log("connected to -->", mongooseRes.connections[0].name);
  })
  .catch((err) => {
    console.log(err, "<--err");
  });
