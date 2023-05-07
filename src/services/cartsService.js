const cartsDao = require("../models/cartsDao");

const createCatr = async (userId, productsId, quantity) => {
  const createCart = await cartsDao.createCatr(userId, productsId, quantity);
  return createCart;
};

module.exports = {
  createCatr,
};
