const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error has occurred in getting All Products /productController" });
  }
};

module.exports = {
  getAllProducts,
}
