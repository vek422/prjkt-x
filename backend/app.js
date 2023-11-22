const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = express();

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");
const verifyToken = require("./middleware/auth");
const { findUser, refreshUser } = require("./controllers/auth");
const corsOptions = {
  origin: true,
  credentials: true,
};
// setting cors at one place for all the routes
// putting cors as first in order to avoid unneccessary requests from unallowed origins
app.use(morgan("common"));
app.use(function (req, res, next) {
  cors(corsOptions)(req, res, next);
});
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/test", (req, res) => {
  res.send("Hello form the server");
});
app.use("/auth", authRoutes);
app.use("/project", verifyToken, projectRoutes);
app.use("/user", verifyToken, userRoutes);
app.use("/task", verifyToken, taskRoutes);
app.get("/refreshUser", verifyToken, refreshUser);

module.exports = app;
