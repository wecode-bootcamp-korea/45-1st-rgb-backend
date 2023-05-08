const cartsDao = require("../models/cartsDao");

const cartInfo = async (userId) => {
  const cart = await cartsDao.cartInfo(userId);
  return cart;
};

const createCart = async (userId, productsId, quantity) => {
  const createCart = await cartsDao.createCart(userId, productsId, quantity);
  return createCart;
};

const modifyQuantity = async (userId, productsId, calculation) => {
  const modifyQuantity = await cartsDao.modifyQuantity(
    userId,
    productsId,
    calculation
  );
  return modifyQuantity;
};

module.exports = {
  createCart,
  modifyQuantity,
  cartInfo,
};
