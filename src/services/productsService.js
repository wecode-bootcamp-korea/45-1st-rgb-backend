const productsDao = require("../models/productsDao");

const getAllProducts = async (limit, offset, category) => {
  try {
    const categoryId = category === "arts" ? 1 : "goods";
    const rows = await productsDao.getAllProducts(limit, offset, categoryId);
    return rows;
  } catch (err) {
    throw new Error("Error has occurred in getting all products in productsService/getAllProducts");
  }
};

const getArtsProducts = async (limit, offset) => {
  return await getAllProducts(limit, offset, "arts");
};

const getGoodsProducts = async (limit, offset) => {
  return await getAllProducts(limit, offset, "goods");
};

const getProduct = async (productId) => {
  try {
    const product = await productsDao.getProduct(productId);
    return product;
  } catch (error) {
    throw new Error("Error has occurred in getting specific product in productsService/getProduct");
  }
};

module.exports = {
  getAllProducts,
  getArtsProducts,
  getGoodsProducts,
  getProduct
};
