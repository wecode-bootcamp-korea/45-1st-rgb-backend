const ordersService = require("../services/ordersService");
const { v4: uuidv4 } = require("uuid");

const placeOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const products = req.body.products;

    const productsWithPrices = await ordersService.getProductsPrices(products);
    const points = ordersService.calculatePoints(productsWithPrices);
    await ordersService.updateUserPoints(userId, points);
    await ordersService.updateProductStock(products);
    const orderNumber = uuidv4();
    await ordersService.saveOrder(userId, orderNumber, products);

    res.status(200).json({ message: "Order placed successfully", orderNumber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  placeOrder
}
