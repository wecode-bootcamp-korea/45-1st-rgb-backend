const ordersService = require("../services/ordersService");

const placeOrder = async (req, res) => {
  const userId = req.userId;
  const orderNumber = await ordersService.placeOrder(userId);

  res.status(200).json({
    message: "Order placed successfully",
    orderNumber: orderNumber
  });
};

module.exports = {
  placeOrder
};
