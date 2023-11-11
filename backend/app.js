const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const cookieParser = require("cookie-parser");

require("dotenv").config();
const app = express();
app.use(morgan(common))
const authRoutes = require("./routes/auth");

const corsOptions = {
  origin: true,
  credentials: true,
};
// setting cors at one place for all the routes
// putting cors as first in order to avoid unneccessary requests from unallowed origins
app.use(function (req, res, next) {
  cors(corsOptions)(req, res, next);
});
app.use(helmet());
// app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);

module.exports = app;
