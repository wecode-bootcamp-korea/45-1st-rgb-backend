const express = require("express");
const ordersController = require("../controllers/ordersController");
const { checkToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/", checkToken, ordersController.placeOrder);
router.get("/:id", checkToken, ordersController.getOrderData);

module.exports = {
  router,
};
