const dataSource = require("../models/dataSource");

const getProductsPrices = async (productIds) => {
  try {
    const products = await dataSource.query(
      `SELECT id, price FROM products WHERE id IN (?)`,
      [productIds]
    );
    return products;
  } catch (err) {
    throw new Error("Error_ getProductsPrices /ordersDao " + err.message);
  }
};

const updateUserPoints = async (userId, points) => {
  try {
    await dataSource.query(
      `UPDATE users
      SET points = points - ?
      WHERE id = ?`,
      [points, userId]
    );
  } catch (err) {
    throw new Error("Error updating user points in ordersDAO " + err.message);
  }
};

const updateProductStock = async (productId, updatedQuantity) => {
  try {
    await dataSource.query(
      `UPDATE products
      SET quantity = ?
      WHERE id = ?`,
      [updatedQuantity, productId]
    );
  } catch (err) {
    throw new Error("Error updating product stock in ordersDAO " + err.message);
  }
};

const saveOrder = async (userId, orderNumber, products) => {
  try {
    let totalPrice = 0;

    for (const product of products) {
      const [price] = await getProductsPrices([product.productId]);
      totalPrice += price.price * product.quantity;
    }
    const result = await dataSource.query(
      `INSERT INTO orders (order_number, users_id, total_price, order_status_id) VALUES (?, ?, ?, ?)`,
      [orderNumber, userId, totalPrice, 1]
    );
    const orderId = result.insertId;
    for (const product of products) {
      await dataSource.query(
        `INSERT INTO order_items (orders_id, products_id, quantity) VALUES (?, ?, ?)`,
        [orderId, product.productId, product.quantity]
      );
    }
  } catch (err) {
    console.log(err.message);
    throw new Error("Error_ saveOrder /ordersService");
  }
};

module.exports = {
  getProductsPrices,
  updateUserPoints,
  updateProductStock,
  saveOrder
};