const ordersDao = require("../models/ordersDao");

const addUserAddress = async (userId, address, postalCode) => {
  try {
    const addUserAddress = await productsDao.getAllProducts(userId, address, postalCode);
    return addUserAddress;
  } catch (err) {
    throw new Error("Error_ addUserAddress /ordersService")
  }
};

module.exports = {
  addUserAddress
}
