const express = require("express");
const productsController = require("../controllers/productsController");

const router = express.Router();

router.get('', productsController.getAllProducts);
router.get('/:productId', productsController.getProduct);
router.get('/:productsId/:productsImageId', productsController.getProductsImage);

module.exports = {
  router,
};
