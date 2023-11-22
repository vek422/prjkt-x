const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskDesc: {
      type: String,
      required: true,
      trim: true,
    },
    taskType: { type: String, required: true, trim: true },
    assignedTo: [],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
