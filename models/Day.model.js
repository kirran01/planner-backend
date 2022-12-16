const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
  day: Date,
  quote: String,
  myEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

const Day = mongoose.model("Day", daySchema);
module.exports = Day;
