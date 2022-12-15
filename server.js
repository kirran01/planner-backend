require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server up");
  });

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connectRes) => {
    console.log("connected to -->", connectRes.connections[0].name);
    app.listen(PORT, () => {
      console.log("server up on port-->", +PORT);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
