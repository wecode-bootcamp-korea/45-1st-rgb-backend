const { v4: uuidv4 } = require("uuid");
const { cartInfo } = require("../models/cartsDao");
const { getUserById } = require("../models/usersDao");
const { getProduct } = require("../models/productsDao");
const orderDao = require("../models/ordersDao");

const placeOrder = async (userId) => {
  try {
    const carts = await cartInfo(userId);

    if (!carts) {
      throw new Error("Invalid request parameters");
    }

    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found");
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
      throw new Error("Not enough points to purchase all cart items");
    }

    const orderNumber = uuidv4();
    const orderStatusId = 2;
    const totalOrderPrice = totalCartPrice;
    return await orderDao.placeOrder(userId, orderStatusId, totalOrderPrice, cartItems, orderNumber);
  } catch (err) {
    console.log(err);
    throw new Error("Error in orderService");
  }
};

const getOrderData = async (orderId) => {
  try {
    const order = await orderDao.getOrderData(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    const user = await userDao.getUserById(order.users_id);
    if (!user) {
      throw new Error(`User with ID ${order.users_id} not found`);
    }

    const orderItems = await orderDao.getOrderItems(orderId);
    const products = await Promise.all(
      orderItems.map((item) => {
        return productDao.getProductWithImage(item.products_id);
      })
    );

    const data = {
      order_number: order.uuid,
      order_date: order.created_at,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        address: user.address,
        postalcode: user.postalcode,
        points: user.points,
      },
      products: products.map((product, index) => {
        return {
          id: product.id,
          title: product.title,
          count: orderItems[index].quantity,
          price: product.price,
          image_url: product.image_url,
        };
      }),
      total_price: order.total_price,
      order_status: order.order_status,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Error in orderService/getOrderData");
  }
};

module.exports = {
  placeOrder,
  getOrderData
};
