const ordersService = require("../services/ordersService");

const placeOrder = async (req, res) => {
  const userId = req.userId;
  const orderNumber = await ordersService.placeOrder(userId);

  res.status(200).json({
    message: "Order placed successfully",
    orderNumber: orderNumber
  });
};

const getOrderData = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const orderData = await ordersService.getOrderData(orderId);
    res.status(200).json(orderData);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeOrder,
  getOrderData
};
