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

  const [info] = await usersDao.logIn(email);

  if (!info) throw new Error("INVALID_EMAIL_OR_PASSWORD");

  const check = await bcrypt.compare(password, info.password);

  if (!check) throw new Error("INVALID_EMAIL_OR_PASSWORD");

  return jwt.sign(
    {
      email: info.email,
      points: info.points,
      first_name: info.first_name,
      last_name: info.last_name,
      subscription: info.subscription,
    },
    process.env.SECRETKEY
  );
};

module.exports = {
  signUp,
  logIn,
};
