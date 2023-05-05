const dataSource = require("../models/dataSource");

const addUserAddress = async (userId, address, postalCode) => {
  try {
    const [user] = await dataSource.query(
      `SELECT id FROM users WHERE id = ?`,
      [userId]
    );

    if (user) {
      const user_id = user.id;

      await dataSource.query(
        `UPDATE users
        SET
          address = ?,
          postalcode = ?
        WHERE id = ?`,
        [address, postalCode, user_id]
      );

      return { message: "🎉 Address has been updated successfully 🎉 " };
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error updating address for User ordersDAO " + err.message);
  }
};

const getUserData = async (userId) => {
  try {
    const [user] = await dataSource.query(
      `SELECT id, email, subscription, first_name, last_name, profile_image_url, address, postalcode, cellphone, sex, points, created_at, updated_at, is_active
      FROM users
      WHERE id = ?`,
      [userId]
    );

    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error getting user data in ordersDAO " + err.message);
  }
};

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
  addUserAddress,
  getUserData,
  getProductsPrices,
  updateUserPoints,
  updateProductStock,
  saveOrder
};