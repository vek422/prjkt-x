const User = require("../models/User");
const Project = require("../models/Project");
const getUserProject = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId).populate("projects");

    res.status(200).json({ projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: `Error at Server : ${err}` });
  }
};
const findUser = async (req, res) => {
  const userEmail = req.query.email;
  let user = await User.findOne({ email: userEmail });
  if (!user) return res.status(404).json({ message: "User Not Found" });

  const { email, firstName, lastName, _id } = user;
  res.status(200).json({ user: { email, firstName, lastName, _id } });
};
module.exports = { getUserProject, findUser };
