const ordersDao = require("../models/ordersDao");
const usersDao = require("../models/usersDao");
const BaseError = require("../models/BaseError");

const placeOrder = async (userId, cartId, productsId, quantity) => {
  try {
    if (!cartId || !productsId || !quantity) {
      throw new BaseError("Invalid request parameters", 400);
    }

    const user = await usersDao.getUserById(userId); // retrieve user object
    console.log(user)
    const cartItems = await ordersDao.getCartItemsTotal(userId);
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    if (totalPrice > user.points) {
      throw new BaseError("Not enough points to place the order", 409);
    }

    const orderNumber = await ordersDao.placeOrder(
      userId,
      1, // hardcoding statusId to 1 for now
      totalPrice,
      cartItems.map((item) => item.cartId),
      cartItems.map((item) => [item.productId, item.quantity])
    );

    return orderNumber;
  } catch (err) {
    console.log(err);
    throw new BaseError("Error placing order", 500);
  }
};

module.exports = {
  placeOrder
};
