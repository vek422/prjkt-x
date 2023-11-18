const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/auth.js");
const { createUser, Login, refreshUser } = require("../controllers/auth.js");
router.post("/register", createUser);
router.post("/login", Login);
router.get("/refreshUser", verifyToken, refreshUser);
module.exports = router;
