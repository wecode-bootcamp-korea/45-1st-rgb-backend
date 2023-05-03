const bcrypt = require("bcrypt");

const usersDao = require("../models/usersDao");

const { pwValidationCheck } = require("../utils/validation-check");
const { emailValidationCheck } = require("../utils/validation-check");

const signUp = async (email, password, points) => {
  await pwValidationCheck(password);
  await emailValidationCheck(email);

  const saltRounds = Number(process.env.SALT);
  const salt = await bcrypt.genSalt(saltRounds);

  const hashPassword = await bcrypt.hash(password, salt);

  return await usersDao.signUp(email, hashPassword, points);
};

module.exports = {
  signUp,
};
