const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");
const createTask = async (req, res) => {
  const types = ["todo", "inProgress", "done"];
  try {
    const { taskName, taskDesc, userId, assigned, projectId, type } = req.body;
    console.log("req.body: ", req.body);
    const taskType = types.includes(type) ? type : "todo";
    console.log(taskType);
    console.log(projectId, userId);
    const project = await Project.findById(projectId);
    if (!project) {
      console.log("fauled at first step");
      return res.status(404).json({ message: "User Not Found" });
    }
    console.log("passed");
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const newTask = new Task({
      taskName,
      taskDesc,
      createdBy: user._id,
      assignedTo: assigned || [],
    });
    const savedTask = await newTask.save();
    const x = await Project.findByIdAndUpdate(projectId, {
      $push: { [`projectTasks.${taskType}`]: savedTask._id },
    });
    console.log(x);
    const savedProject = await Project.findById(projectId)
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
    res.status(200).json({ project: savedProject });
  } catch (err) {
    return res.status(500).json({ message: `error at server : ${err}` });
  }
};

const changeTaskType = async (req, res) => {
  const types = ["todo", "inProgress", "done"];
  try {
    const { taskId, projectId, currentState, nextState } = req.body;
    if (!types.includes(currentState) || !types.includes(nextState))
      return res.status(400).json({ message: "Invalid Operations" }).end();
    const project = await Project.findById(projectId);
    if (!project)
      return res.status(404).json({ message: "Project Not Found" }).end();
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task Not Found" }).end();
    await Project.findByIdAndUpdate(projectId, {
      $pull: { [`projectTasks.${currentState}`]: taskId },
    });
    await Project.findByIdAndUpdate(projectId, {
      $addToSet: { [`projectTasks.${nextState}`]: taskId },
    });
    const savedProject = await Project.findById(projectId)
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
    res.status(200).json({ project: savedProject }).end();
  } catch (err) {
    return res.status(500).json({ message: `error at server : ${err}` });
  }
};

const fetchTasks = async (req, res) => {
  const { projectId } = req.query;
  const project = await Project.findById(projectId).populate([
    "projectTasks.todo",
    "projectTasks.inProgress",
    "projectTasks.done",
  ]);
  if (!project) return res.status(404).json({ message: "Project Not Found" });
  res.status(200).json({ project });
};

module.exports = { createTask, changeTaskType, fetchTasks };
