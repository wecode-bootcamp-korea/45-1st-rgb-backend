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

    return orderNumber;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const getOrderData = async (orderId) => {
  const query = `
  SELECT
    o.id AS id,
    o.users_id AS usersId,
    o.total_price AS totalPrice,
    o.uuid,
    o.order_status_id, 
    oi.products_id,
    oi.quantity,
    p.title AS productName,
    pi.image_url AS image_url,
    u.first_name AS firstName,
    u.last_name AS lastName,
    u.email,
    u.address,
    u.postalcode,
    u.points
  FROM orders o
  JOIN order_items oi ON o.id = oi.orders_id
  JOIN users u ON o.users_id = u.id
  JOIN products p ON oi.products_id = p.id
  JOIN products_images pi ON pi.products_id = p.id
  WHERE o.uuid = ?`;

  const result = await dataSource.query(query, [orderId]);
  console.log(result)
  if (!result || result.length === 0) {
    throw new Error("Order not found or invalid orderId");
  }

  const order = {
    id: result[0].id,
    users_id: result[0].usersId,
    total_price: result[0].totalPrice,
    uuid: result[0].uuid,
    order_status_id: result[0].order_status_id,
    products: result.map((item) => ({
      image_url: item.image_url,
      product_id: item.products_id,
      product_title: item.productName,
      quantity: item.quantity,
    })),
    user: {
      first_name: result[0].firstName,
      last_name: result[0].lastName,
      email: result[0].email,
      address: result[0].address,
      postalcode: result[0].postalcode,
      points: result[0].points,
    },
  };

  return order;
};

module.exports = {
  placeOrder,
  getOrderData
};
