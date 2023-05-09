const ordersService = require("../services/ordersService");
const BaseError = require("../models/BaseError");

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartId, productsId, quantity } = req.body;

    const orderNumber = await ordersService.placeOrder(
      userId,
      cartId,
      productsId,
      quantity
    );

    res.status(200).json({
      message: "Order placed successfully",
      orderNumber: orderNumber
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({
      error: err.message || "Internal server error"
    });
  }
};

module.exports = {
  placeOrder
};
