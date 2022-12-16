const mongoose = require("mongoose");
const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: String,
  eventUrl: String,
  imageUrl: String,
  userEntry: String,
  dayId: { type: Schema.Types.ObjectId, ref: 'Day' }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
