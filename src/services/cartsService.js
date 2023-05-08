const cartsDao = require("../models/cartsDao");

const createCart = async (userId, productsId, quantity) => {
  const createCart = await cartsDao.createCart(userId, productsId, quantity);
  return createCart;
};

const subtract = async (id, userId) => {
  const subtract = await cartsDao.subtract(id, userId);
  return subtract;
};

module.exports = {
  createCart,
  subtract,
};
