require("dotenv/config");
const mongoose = require("mongoose");
const User = require("../models/User.model");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((mongooseRes) => {
    console.log("connected to -->", mongooseRes.connections[0].name);
    return User.create({
      email: "from user seed",
      name: "from user seed",
      password: "from user seed",
    });
  })
  .then((createdUser) => {
    console.log(createdUser, "<--created user");
  })
  .catch((err) => {
    console.log(err, "err");
  });
