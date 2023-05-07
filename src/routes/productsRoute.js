const express = require("express");
const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/", productsController.getAllProducts);
router.get("/arts", productsController.getAllArtsProducts);
router.get("/goods", productsController.getAllGoodsProducts);
router.get("/:productId", productsController.getProduct);

module.exports = {
  router,
};
