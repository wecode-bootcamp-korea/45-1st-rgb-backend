const dataSource = require("../models/dataSource");

const placeOrder = async (userId, orderStatusId, totalPrice, cartItems, orderNumber) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // First, create a new order record in the orders table
    const createOrder = await queryRunner.query(
      `INSERT INTO orders (
            users_id,
            order_status_id,
            total_price,
            uuid
            ) VALUES (?,?,?,?)`,
      [userId, orderStatusId, totalPrice, orderNumber]
    );

    // Then, create order items for each item in the cart
    const orderItemsWithOrderId = cartItems.map((item) => [createOrder.insertId, ...item]);

    await queryRunner.query(
      `INSERT INTO order_items (
          orders_id,
          products_id,
          quantity) VALUES ?`,
      [orderItemsWithOrderId]
    );

    // Update the product quantity
    for (const item of cartItems) {
      const [product] = await dataSource.query(
        `SELECT quantity FROM products WHERE id = ?`,
        [item[0]]
      );
      const newQuantity = product.quantity - item[1];
      await queryRunner.query(`
        UPDATE products
        SET quantity = ?
        WHERE id = ?
      `, [newQuantity, item[0]]);
    }

    const user = await dataSource.query(
      `SELECT points FROM users WHERE id = ?`,
      [userId]
    );

    if (user && user[0] && user[0].points) {
      // Deduct the total price from the user's points
      await queryRunner.query(`
          UPDATE users 
          SET 
          points = ? 
          WHERE id = ?`,
        [user[0].points - totalPrice, userId]
      );
    }

    // Finally, delete the cart items
    await queryRunner.query(`DELETE 
              FROM carts
              WHERE users_id = ?`, [userId]);

    await queryRunner.commitTransaction();

    return createOrder.insertId;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const getOrderData = async (orderId) => {
  const query = `
    SELECT orders.id, orders.users_id, orders.total_price, orders.uuid, orders.order_status_id, 
      order_items.products_id, order_items.quantity
    FROM orders
    JOIN order_items ON orders.id = order_items.orders_id
    WHERE orders.id = ?`;

  const result = await dataSource.query(query, [orderId]);
  if (!result || result.length === 0) {
    throw new Error("Order not found");
  }

  const order = {
    id: result[0].id,
    users_id: result[0].users_id,
    total_price: result[0].total_price,
    uuid: result[0].uuid,
    order_status_id: result[0].order_status_id,
    products: result.map((item) => ({
      product_id: item.products_id,
      quantity: item.quantity,
    })),
  };

  return order;
};

module.exports = {
  placeOrder,
  getOrderData
};
