const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  tomatoes: { type: Number, default: 0 },
});

module.exports = Task = mongoose.model("Task", TaskSchema);
