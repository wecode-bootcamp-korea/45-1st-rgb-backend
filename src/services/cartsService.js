const cartsDao = require("../models/cartsDao");

const createCart = async (userId, productsId, quantity) => {
  const createCart = await cartsDao.createCart(userId, productsId, quantity);
  return createCart;
};

const cartUpdate = async (userId, productsId) => {
  const cartUpdate = await cartsDao.cartUpdate(userId, productsId);
  return cartUpdate;
};

module.exports = {
  createCart,
  cartUpdate,
};
