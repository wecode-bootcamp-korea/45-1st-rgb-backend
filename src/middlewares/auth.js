const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) new Error("INVALID_ACCESS_TOKEN");

    const decode = jwt.verify(token, process.env.SECRETKEY);

    req.userId = decode.userId;

    next();
  } catch {
    res.status(401).json({ message: "INVALID_ACCESS_TOKEN" });
  }
};
module.exports = {
  checkToken,
};
