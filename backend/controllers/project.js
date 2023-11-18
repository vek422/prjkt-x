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
  const { userId, projectName, projectDesc } = req.body;

  const newProject = new Project({
    projectName,
    projectDesc,
    projectTeam: {
      admin: userId,
    },
  });
  const savedProject = await newProject.save();
  await User.findByIdAndUpdate(userId, { projects: savedProject._id });
  res.status(200).json(savedProject);
};

const getProjectDetails = async (req, res) => {
  const projects = await Project.find().populate("projectTeam.admin", [
    "firstName",
    "lastName",
    "email",
    "_id",
  ]);
  res.send(projects);
};

module.exports = { getProjectDetails, createProject };
