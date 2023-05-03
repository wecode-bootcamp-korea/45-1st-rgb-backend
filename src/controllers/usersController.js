const userService = require("../services/usersService");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const points = process.env.POINTS;

    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(email, password, points);
    return res.status(201).json({ message: "SUCCESS_SIGNUP" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
};
