const { Router } = require("express");
const router = Router();
const { createUser, Login } = require("../controllers/auth.js");
router.post("/create-user", createUser);
router.post("/login", Login);

module.exports = router;
