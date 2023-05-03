const bcrypt = require("bcrypt");

const usersDao = require("../models/usersDao");

const { pwValidationCheck } = require("../utils/validation-check");
const { emailValidationCheck } = require("../utils/validation-check");

const signUp = async (email, password, points) => {
  await pwValidationCheck(password);
  await emailValidationCheck(email);

  const hashPassword = await bcrypt.hash(password, 13);

  return await usersDao.signUp(email, hashPassword, points);
};

module.exports = {
  signUp,
};
