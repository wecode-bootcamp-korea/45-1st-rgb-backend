const cartsDao = require("../models/cartsDao");

const cartInfo = async (userId) => {
  const cart = await cartsDao.cartInfo(userId);
  return cart;
};

const createCart = async (userId, productsId, quantity) => {
  const createCart = await cartsDao.createCart(userId, productsId, quantity);
  return createCart;
};

const deleteProduct = async (userId, cartId) => {
  const deleteProduct = await cartsDao.deleteProduct(userId, cartId);
  return deleteProduct;
};

module.exports = {
  createCart,
  cartInfo,
  deleteProduct,
};
