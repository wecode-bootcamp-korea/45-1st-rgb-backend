const productsService = require("../services/productsService");

const getAllProducts = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const products = await productsService.getAllProducts(limit, offset);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getProductsByCategories = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0, category } = req.query;
    const products = await productsService.getProductsByCategories(limit, offset, category);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productsService.getProduct(productId);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategories,
  getProduct,
};
