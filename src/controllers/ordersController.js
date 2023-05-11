const ordersService = require("../services/ordersService");

const placeOrder = async (req, res) => {
  const userId = req.userId;
  const orderResult = await ordersService.placeOrder(userId);

  if (orderResult.error) {
    res.status(400).json({
      message: orderResult.error
    });
  } else {
    res.status(200).json({
      message: "Order placed successfully",
      orderNumber: orderResult
    });
  }
};


const getOrderData = async (req, res) => {
  const orderNumber = req.params.orderNumber;
  try {
    const orderData = await ordersService.getOrderData(orderNumber);
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
