const { v4: uuidv4 } = require("uuid");
const { cartInfo } = require("../models/cartsDao");
const { getUserById } = require("../models/usersDao");
const { getProduct } = require("../models/productsDao");
const orderDao = require("../models/ordersDao");

const placeOrder = async (userId) => {
  try {
    const carts = await cartInfo(userId);

    if (!carts) {
      return { error: "Invalid request parameters" };
    }

    const user = await getUserById(userId);
    if (!user) {
      return { error: "User not found" };
    }

    let totalCartPrice = 0;
    const cartItems = [];

    for (const cart of carts) {
      const product = await getProduct(cart.products_id);
      const parsedPrice = parseFloat(product.price);
      const cartQuantity = cart.count || 0;

      if (cartQuantity > product.quantity) {
        throw new Error(`Not enough stock for product with ID ${cart.products_id}`);
      }

      const productTotal = parsedPrice * cartQuantity;
      totalCartPrice += productTotal;
      cartItems.push([cart.products_id, cart.count]);
    }

    if (user.points < totalCartPrice) {
      return { error: "Not enough points to purchase all cart items" };
    }

    const orderNumber = uuidv4();
    const orderStatusId = 2;
    const totalOrderPrice = totalCartPrice;
    return await orderDao.placeOrder(userId, orderStatusId, totalOrderPrice, cartItems, orderNumber);
  } catch (err) {
    console.log(err);
    return Error("Error in orderService");
  }
};

const getOrderData = async (orderId) => {
  return await orderDao.getOrderData(orderId);
};

module.exports = {
  placeOrder,
  getOrderData
};
