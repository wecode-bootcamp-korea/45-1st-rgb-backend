const productsDao = require("../models/productsDao");

const getAllProducts = async (limit, offset) => {
  try {
    const rows = await productsDao.getAllProducts(limit, offset);
    return rows;
  } catch (err) {
    throw new Error("Error has occurred in getting all products in productsService/getAllProducts");
  }
};

const getProductsByCategories = async (limit, offset, category) => {
  try {
    const rows = await productsDao.getProductsByCategories(limit, offset, category);
    return rows;
  } catch (err) {
    throw new Error(
      "Error has occurred in getting all products in productsService/getAllProducts"
    );
  }
};

const getProduct = async (productId) => {
  try {
    const product = await productsDao.getProduct(productId);
    return product;
  } catch (error) {
    throw new Error(
      "Error has occurred in getting specific product in productsService/getProduct"
    );
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategories,
  getProduct,
};
