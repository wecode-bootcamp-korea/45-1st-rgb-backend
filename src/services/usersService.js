const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersDao = require("../models/usersDao");

const { pwValidationCheck } = require("../utils/validation-check");
const { emailValidationCheck } = require("../utils/validation-check");

const getUserData = async (userId) => {
  try {
    const userData = await usersDao.getUserData(userId);
    return userData;
  } catch (err) {
    throw new Error("Error_ getUserData /ordersService");
  }
};

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

const getUserById = async (userId) => {
  const user = await usersDao.getUserById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

const addUserAddress = async (userId, address, postalCode, cellphone) => {
  try {
    await getUserById(userId);
    const addUserAddressResult = await usersDao.addUserAddress(userId, address, postalCode, cellphone);
    return addUserAddressResult;
  } catch (err) {
    throw new Error("Error_ addUserAddress /usersService " + err.message);
  }
};

module.exports = {
  getUserData,
  signUp,
  logIn,
  getUserById,
  addUserAddress
};
