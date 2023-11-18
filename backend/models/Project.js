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
    projectTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
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
