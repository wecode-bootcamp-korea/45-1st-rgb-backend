const ordersDao = require("../models/ordersDao");

const addUserAddress = async (userId, address, postalCode) => {
  try {
    const addUserAddressResult = await ordersDao.addUserAddress(userId, address, postalCode);
    return addUserAddressResult;
  } catch (err) {
    throw new Error("Error_ addUserAddress /ordersService")
  }
};

const getUserData = async (userId) => {
  try {
    const userData = await ordersDao.getUserData(userId);
    return userData;
  } catch (err) {
    throw new Error("Error_ getUserData /ordersService");
  }
};

module.exports = {
  addUserAddress, getUserData
}
