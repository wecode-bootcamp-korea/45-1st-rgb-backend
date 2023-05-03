const productsDao = require('../models/productsDao')

const getAllProducts = async (limit, offset) => {
  try {
    const products = await productsDao.getAllProducts(limit, offset);
    return products;
  } catch (err) {
    throw new Error("Error has occurred in getting All Products /productService/getAllProducts")
  }
};

const getSpecificProducts = async (productsId) => {
  try {
    const products = await productsDao.getSpecificProducts(productsId);
    return products;
  } catch (err) {
    throw new Error("Error has occurred in getting Specific Products /productService/getSpecificProducts");
  }
};

module.exports = {
  getAllProducts, getSpecificProducts
}

