const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersDao = require("../models/usersDao");

const { pwValidationCheck } = require("../utils/validation-check");
const { emailValidationCheck } = require("../utils/validation-check");

const signUp = async (
  email,
  password,
  firstName,
  lastName,
  subscription,
  points
) => {
  await pwValidationCheck(password);
  await emailValidationCheck(email);

  const saltRounds = Number(process.env.SALT);
  const salt = await bcrypt.genSalt(saltRounds);

  const hashPassword = await bcrypt.hash(password, salt);

  return await usersDao.signUp(
    email,
    hashPassword,
    firstName,
    lastName,
    subscription,
    points
  );
};

const logIn = async (email, password) => {
  await pwValidationCheck(password);
  await emailValidationCheck(email);

  const user = await usersDao.getUserByEmail(email);

  if (!user) throw new Error("INVALID_EMAIL_OR_PASSWORD");

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) throw new Error("INVALID_EMAIL_OR_PASSWORD");

  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.SECRETKEY
  );
};

module.exports = {
  signUp,
  logIn,
};
