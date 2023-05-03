const productsService = require("../services/productsService");

const getAllProducts = async (req, res) => {
  try {
    const { limit = 6, offset = 0 } = req.query;
    const products = await productsService.getAllProducts(limit, offset);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        message:
          "Error has occurred in getting All Products /productController",
      });
  }
};

module.exports = {
  getAllProducts,
};
