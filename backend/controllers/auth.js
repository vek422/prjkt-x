const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //check if user with email exßists
    const isEmailExists = await User.exists({ email: email });

    if (isEmailExists) {
      return res.status(403).json({ message: "User Already Exists" }).end();
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    let user = savedUser.toObject();
    delete user.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE_KEY);
    res.status(201).json({ user, token }).end();
  } catch (err) {
    res.status(500).json({ message: `Something went wrong \n : ${err}` });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" }).end();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" }).end();
    }
    user = user.toObject();
    delete user.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE_KEY);
    res.status(201).json({ token, user }).end();
  } catch (err) {
    res.status(500).json({ message: err }).end();
  }
};
const findUser = async (req, res) => {
  const userEmail = req.query.email;
  let user = await User.findOne({ email: userEmail });
  if (!user) return res.status(404).json({ message: "User Not Found" });

  const { email, firstName, lastName } = user;
  res.status(200).json({ user: { email, firstName, lastName } });
};

module.exports = { createUser, Login, findUser };
