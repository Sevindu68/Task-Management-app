const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    require: true,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
