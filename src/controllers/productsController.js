const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  try {
    const { limit = 6, offset = 0 } = req.query;
    const products = await productsService.getAllProducts(limit, offset);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error has occurred in getting All Products /productController" });
  }
};

const getSpecificProducts = async (req, res) => {
  try {
    const productsId = req.params.productsId;
    if (!productsId) {
      return res.status(400).json({ message: 'PRODUCTS_NOT_FOUND' });
    }

    const products = await productsService.getSpecificProducts(productsId);

    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ message: "Error has occurred in getting Specific Products /productController" });
  }
};


module.exports = {
  getAllProducts, getSpecificProducts
}
