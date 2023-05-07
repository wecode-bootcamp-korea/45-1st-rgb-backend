const userService = require("../services/usersService");

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, subscription } = req.body;
    const points = process.env.POINTS;

    if (!email || !password || !firstName || !lastName || !subscription) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(
      email,
      password,
      firstName,
      lastName,
      subscription,
      points
    );
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

const addUserAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address, postalCode } = req.body;

    if (!userId || !address || !postalCode) {
      return res.status(400).json({ message: 'USER_INPUT_DATA_IS_NOT_ENOUGH' });
    }

    await userService.addUserAddress(userId, address, postalCode);

    return res.status(200).json({ message: 'Address added successfully' });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error_ addUserAddress /usersController",
    });
  }
};

module.exports = {
  signUp,
  logIn,
  addUserAddress
};
