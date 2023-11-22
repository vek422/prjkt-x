const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");
const createTask = async (req, res) => {
  const types = ["todo", "inProgress", "done"];
  try {
    const { taskName, taskDesc, userId, assigned, projectId, type } = req.body;
    const taskType = types.includes(type) ? type : "todo";
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const newTask = new Task({
      taskName,
      taskDesc,
      createdBy: user._id,
      taskType: type,
      assignedTo: assigned || [],
    });
    const savedTask = await newTask.save();
    const x = await Project.findByIdAndUpdate(projectId, {
      $push: { [`projectTasks.${taskType}`]: savedTask._id },
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
    res.status(200).json({ project: savedProject });
  } catch (err) {
    return res.status(500).json({ message: `error at server : ${err}` });
  }
};

const changeTaskType = async (req, res) => {
  const types = ["todo", "inProgress", "done"];
  try {
    const { taskId, projectId, currentState, nextState } = req.body;
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
    await Task.findByIdAndUpdate(taskId, { taskType: nextState });
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

const assignUser = async (req, res) => {
  const { taskId, userId, projectId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User Not Found" });
  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: "Task Not Found" });
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: "Project Not Found" });
  await Task.findByIdAndUpdate(taskId, { assignedTo: { $addToSet: userId } });
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
};

module.exports = { createTask, changeTaskType, fetchTasks, assignUser };
