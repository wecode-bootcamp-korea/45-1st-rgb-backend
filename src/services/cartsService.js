const cartsDao = require("../models/cartsDao");

const cartIn = async (userId, productsId) => {
  const cart = await cartsDao.cartIn(userId, productsId);
  return cart;
};

const cartInfo = async (userId) => {
  const cart = await cartsDao.cartInfo(userId);
  return cart;
};

module.exports = {
  cartIn,
  cartInfo,
};
