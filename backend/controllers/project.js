// Create Project
// requiredments :
//  1.User(leader)
//  2.ProjectName
//  3.Team Members (optional)
//  4.Task List (empty initially)
// default params:
//  1. Created at

const Project = require("../models/Project");
const User = require("../models/User");
const createProject = async (req, res) => {
  const { userId, projectName, projectDesc, teamMates = [] } = req.body;
  const newProject = new Project({
    projectName,
    projectDesc,
    projectTeam: {
      admin: userId,
      teamMembers: teamMates,
    },
  });
  const savedProject = await newProject.save();
  const project = await Project.findById(savedProject._id)
    .populate("projectTeam.admin", ["firstName", "lastName", "email", "_id"])
    .populate("projectTeam.teamMembers", [
      "firstName",
      "lastName",
      "email",
      "_id",
    ]);
  console.log("teamMate : ", teamMates);
  await teamMates.forEach(async (teamMate) => {
    const x = await User.findByIdAndUpdate(teamMate, {
      $addToSet: { projects: savedProject._id },
    });
  });
  await User.findByIdAndUpdate(userId, {
    $addToSet: { projects: savedProject._id },
  });
  res.status(200).json(project);
};

const getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res.status(404).json({ message: "INVALID PROJECT ID" }).end();
    }
    const project = await Project.findById(projectId)
      .populate("projectTeam.admin", ["firstName", "lastName", "email", "_id"])
      .populate("projectTeam.teamMembers", [
        "firstName",
        "lastName",
        "email",
        "_id",
      ])
      .populate([
        "projectTasks.todo",
        "projectTasks.inProgress",
        "projectTasks.done",
      ]);
    if (!project) return res.status(404).json({ message: "Project Not Found" });
    return res.status(200).json({ project: project });
  } catch (err) {
    res.status(500).json({ message: `SERVER ERROR : ${err}` });
  }
};

module.exports = { getProjectDetails, createProject };
