const { getProjectDetails, createProject } = require("../controllers/project");

const { Router } = require("express");
const router = Router();
router.post("/create", createProject);
router.get("/get", getProjectDetails);

module.exports = router;
