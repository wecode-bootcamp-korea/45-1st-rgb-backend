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
  try {
    const [order] = await dataSource.query(
      `SELECT 
        orders.id as order_id,
        orders.created_at as order_date,
        orders.total_price,
        order_status.name as order_status_name,
        users.first_name,
        users.last_name,
        users.email,
        users.address,
        users.postalcode,
        users.points
      FROM orders
      INNER JOIN users ON users.id = orders.users_id
      INNER JOIN order_status ON order_status.id = orders.order_status_id
      WHERE orders.id = ?`,
      [orderId]
    );

    const orderItems = await dataSource.query(
      `SELECT 
        products.title,
        order_items.quantity as count,
        products.price,
        products_images.product_id
      FROM order_items
      INNER JOIN products ON products.id = order_items.products_id
      INNER JOIN products_images ON products_images.products_id = products.id
      WHERE order_items.orders_id = ?`,
      [orderId]
    );

    return { order, orderItems };
  } catch (err) {
    throw new Error("Error has occurred in getting order data in ordersDao/getOrderData");
  }
};

module.exports = {
  placeOrder,
  getOrderData
};
