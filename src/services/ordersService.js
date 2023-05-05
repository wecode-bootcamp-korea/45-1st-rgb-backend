const ordersDao = require("../models/ordersDao");

const addUserAddress = async (userId, address, postalCode) => {
  try {
    const addUserAddressResult = await ordersDao.addUserAddress(userId, address, postalCode);
    return addUserAddressResult;
  } catch (err) {
    throw new Error("Error_ addUserAddress /ordersService")
  }
};

module.exports = {
  addUserAddress
}
