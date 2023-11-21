const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      trim: true,
      required: true,
    },
    projectDesc: {
      type: "String",
      trim: true,
    },
    projectTasks: {
      todo: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] },
      ],
      inProgress: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] },
      ],
      done: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] },
      ],
    },
    projectTeam: {
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      teamMembers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: [],
        },
      ],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
