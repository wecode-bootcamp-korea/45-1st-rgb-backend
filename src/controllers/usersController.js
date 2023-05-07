const userService = require("../services/usersService");

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const points = process.env.POINTS;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(email, password, firstName, lastName, points);
    return res.status(201).json({ message: "SUCCESS_SIGNUP" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const accessToken = await userService.logIn(email, password);

    return res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  logIn,
};
