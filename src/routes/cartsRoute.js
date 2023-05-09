const express = require("express");

const router = express.Router();

const cartsController = require("../controllers/cartsController");
const { checkToken } = require("../middlewares/auth");

router.post("", checkToken, cartsController.createCart);
router.delete("/:cartId", checkToken, cartsController.deleteCart);
router.patch("/:cartId", checkToken, cartsController.modifyQuantity);
router.get("", checkToken, cartsController.cartInfo);

module.exports = {
  router,
};
