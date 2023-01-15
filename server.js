require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//declare routes
const authRouter = require("./routes/auth.routes");
const dayRouter = require("./routes/day.routes");
const eventRouter = require("./routes/event.routes");

const app = express();
const PORT = process.env.PORT;


//enable cors
app.use(
  cors()
);


app.use(express.json());


//use routes
app.use("/auth", authRouter);
app.use("/days", dayRouter);
app.use("/events", eventRouter);

//the initial get to test express
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
