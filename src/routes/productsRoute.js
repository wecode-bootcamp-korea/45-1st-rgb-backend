const express = require("express");
const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/all", productsController.getAllProducts);
router.get("/", productsController.getProductsByCategories);
router.get("/:productId", productsController.getProduct);

module.exports = {
  router,
};
