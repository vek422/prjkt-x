const { Router } = require("express");
const { getUserProject, findUser } = require("../controllers/user");
const router = Router();
router.get("/getProjects", getUserProject);
router.get("/find", findUser);
module.exports = router;
