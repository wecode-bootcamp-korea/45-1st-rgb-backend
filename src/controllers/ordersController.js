const ordersService = require("../services/ordersService");
const { v4: uuidv4 } = require("uuid");

const addUserAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address, postalCode } = req.body;


    if (!userId || !address || !postalCode) {
      return res.status(400).json({ message: 'USER_INPUT_DATA_IS_NOT_ENOUGH' });
    }

    await ordersService.addUserAddress(userId, address, postalCode);

    return res.status(202).json({
      message: 'SUCCESSFULLY UPDATED USERS ADDRESS'
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error_ addUserAddress /ordersController",
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: 'USER_NOT_FOUND' });
    }

    const user = await ordersService.getUserData(userId);

    return res.status(200).json({
      message: 'SUCCESSFULLY_GET_USERS_DATA',
      user
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error_ getUserData /ordersController",
    });
  }
}

const placeOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const products = req.body.products; // Array of objects containing productId and quantity

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
  addUserAddress, getUserData, placeOrder
}
