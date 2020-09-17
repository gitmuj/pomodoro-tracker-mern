const mongoose = require("mongoose");
const { schema } = require("./task");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

//Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

schema.plugin(mongooseUniqueValidator);

module.exports = User = mongoose.model("User", UserSchema);
