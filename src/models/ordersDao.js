const dataSource = require("../models/dataSource");
const BaseError = require("../models/BaseError");

const getCartItemsTotal = async (userId) => {
  try {
    const cartItems = await dataSource.query(
      `SELECT c.products_id, c.quantity, p.price
      FROM cart c
      JOIN products p ON c.products_id = p.id
      WHERE c.users_id = ?`,
      [userId]
    );

    return cartItems.map((item) => ({
      productId: item.products_id,
      quantity: item.quantity,
      totalPrice: item.quantity * item.price
    }));
  } catch (err) {
    console.log(err);
    const error = new Error(`Error getting cart items total`);
    error.statusCode = 400;
    throw error;
  }
};

const placeOrder = async (userId, orderStatusId, totalPrice, cartsId, cartItems) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const createOrder = await queryRunner.query(
      `INSERT INTO orders (
            users_id,
            order_status_id,
            total_price
            ) VALUES (?,?,?)`,
      [userId, orderStatusId, totalPrice]
    );

    const orderId = createOrder.insertId;

    const orderItems = cartItems.map((cartItem) => [orderId, ...cartItem]);

    await queryRunner.query(
      `INSERT INTO order_items (
          orders_id,
          products_id,
          quantity) VALUES ?`,
      [orderItems]
    );

    await queryRunner.query(`
      UPDATE users 
      SET 
      users.points = users.points - ?
      WHERE users.id = ? AND users.points > ?`,
      [totalPrice, userId, totalPrice]
    );

    await queryRunner.query(`DELETE 
              FROM cart 
              WHERE user_id = ? AND id IN (?)`, [userId, cartsId]);

    await queryRunner.commitTransaction();

    return createOrder.uuid;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getCartItemsTotal,
  placeOrder
};
