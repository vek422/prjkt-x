const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access Denied" });

    if (token.startsWith("Bearer "))
      token = token.slice(7, token.length).trimLeft();

    const verified = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    console.log("verified : ", verified);
    req.user = verified;
    console.log("req.user : ", req.user);
    next();
  } catch (err) {
    res.status(500).json({ message: `Error at server : ${err}` });
  }
};

module.exports = verifyToken;
