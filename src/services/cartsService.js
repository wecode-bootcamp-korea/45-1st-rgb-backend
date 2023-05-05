const cartsDao = require("../models/cartsDao");

const cartIn = async (userId, productsId) => {
  const cart = await cartsDao.cartIn(userId, productsId);
  return cart;
};

module.exports = {
  cartIn,
};
