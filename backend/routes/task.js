const { Router } = require("express");
const {
  createTask,
  changeTaskType,
  fetchTasks,
} = require("../controllers/task");
const router = Router();
router.post("/createTask", createTask);
router.post("/changeTask", changeTaskType);
router.get("/fetchTasks", fetchTasks);
module.exports = router;
