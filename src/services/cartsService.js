const cartsDao = require("../models/cartsDao");

const createCart = async (userId, productsId, quantity) => {
  const createCart = await cartsDao.createCart(userId, productsId, quantity);
  return createCart;
};

module.exports = {
  createCart,
};
