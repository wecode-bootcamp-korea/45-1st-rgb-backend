const productsDao = require('../models/productsDao')

const getAllProducts = async (limit, offset) => {
  try {
    const products = await productsDao.getAllProducts(limit, offset);
    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Error has occurred in getting All Products /productService/getAllProducts")
  }
};

module.exports = {
  getAllProducts,
}

