const productsDao = require("../models/productsDao");

const getAllProducts = async (limit, offset) => {
  try {
    const products = await productsDao.getAllProducts(limit, offset);
    return products;
  } catch (err) {
    throw new Error("Error has occurred in getting All Products /productService/getAllProducts")
  }
};

const getProduct = async (productId) => {
  try {
    const product = await productsDao.getProduct(productId);

    if (!product) {
      return res.status(404).json({ message: 'PRODUCTS_NOT_FOUND' });
    }
    return product;
  } catch (err) {
    throw new Error("Error has occurred in getting Specific Products /productService/getSpecificProducts");
  }
};

module.exports = {
  getAllProducts, getProduct
}
