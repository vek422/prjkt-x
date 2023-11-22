const { Router } = require("express");
const {
  createTask,
  changeTaskType,
  fetchTasks,
  assignUser,
} = require("../controllers/task");
const router = Router();
router.post("/createTask", createTask);
router.post("/changeTask", changeTaskType);
router.get("/fetchTasks", fetchTasks);
router.post("/assignUser", assignUser);
module.exports = router;
