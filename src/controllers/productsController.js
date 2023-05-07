const productsService = require("../services/productsService");

const getAllProducts = async (req, res, next) => {
  try {
    const { limit = 6, offset = 0, category } = req.query;
    const products = await productsService.getAllProducts(limit, offset, category);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getAllArtsProducts = async (req, res, next) => {
  try {
    const { limit = 6, offset = 0 } = req.query;
    const products = await productsService.getArtsProducts(limit, offset);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getAllGoodsProducts = async (req, res, next) => {
  try {
    const { limit = 6, offset = 0 } = req.query;
    const products = await productsService.getGoodsProducts(limit, offset);
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
  getAllArtsProducts,
  getAllGoodsProducts,
  getProduct,
};
