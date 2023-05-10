const ordersService = require("../services/ordersService");

const placeOrder = async (req, res) => {
  const userId = req.userId;
  const orderNumber = await ordersService.placeOrder(userId);

  res.status(200).json({
    message: "Order placed successfully",
    orderNumber: orderNumber
  });
};

const getOrderData = async (req, res) => {
  const orderId = req.params.id;
  try {
    const orderData = await ordersService.getOrderData(orderId);
    res.status(200).json(orderData);
  } catch (err) {
    res.status(404).json({
      message: "Order not found",
    });
  }
};

module.exports = {
  placeOrder,
  getOrderData,
};
