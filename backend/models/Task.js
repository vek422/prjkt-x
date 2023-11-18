const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    taskDesc: {
      type: String,
      required: true,
      trim: true,
    },
    assignedTo: [],
    expects: [],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
