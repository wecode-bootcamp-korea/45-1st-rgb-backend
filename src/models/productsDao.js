const dataSource = require("../models/dataSource")

const getAllProducts = async (limit, offset) => {
  try {
    const rows = await dataSource.query(
      `SELECT 
        products.id,
        products.categories_id,
        products.artist_name,
        products.title,
        products.description,
        products.products_size_left,
        products.products_size_right,
        products.price,
        products.material,
        products.quantity,
        products.max_quantity,
        JSON_ARRAYAGG(products_images.image_url) as image_urls
      FROM products 
      INNER JOIN categories ON categories.id = products.categories_id
      LEFT JOIN products_images ON products_images.products_id = products.id
      GROUP BY products.id
      LIMIT ? OFFSET ?;
      `,
      [parseInt(limit), parseInt(offset)]
    );
    return rows;
  } catch (err) {
    throw new Error("Error has occurred in getting All Products /productDao");
  }
};

const getProduct = async (productId) => {
  try {
    const [product] = await dataSource.query(
      `SELECT 
      products.id,
      products.categories_id,
      products.artist_name,
      products.title,
      products.description,
      products.products_size_left,
      products.products_size_right,
      products.price,
      products.material,
      products.quantity,
      products.max_quantity,
      JSON_ARRAYAGG(products_images.image_url) as image_urls
      FROM products
      LEFT JOIN products_images ON products_images.products_id = products.id
      WHERE products.id = ?
      GROUP BY products.id
      `,
      [productId]
    );

    return product;
  } catch (error) {
    throw new Error("Error has occurred in getting Specific Products /productsDao");
  }
};

const updateUserPoints = async (userId, points) => {
  try {
    await dataSource.query(
      `UPDATE users SET points = points + ? WHERE id = ?`,
      [points, userId]
    );
  } catch (error) {
    throw new Error("Error_ updateUserPoints /ordersDao");
  }
};

const updateProductStock = async (products) => {
  try {
    const updateQueries = products.map((product) =>
      dataSource.query(
        `UPDATE products SET quantity = quantity - ? WHERE id = ?`,
        [product.quantity, product.productId]
      )
    );
    await Promise.all(updateQueries);
  } catch (error) {
    throw new Error("Error_ updateProductStock /ordersDao");
  }
};

const saveOrder = async (userId, orderNumber, products) => {
  try {
    const [result] = await dataSource.query(
      `INSERT INTO orders (user_id, order_number) VALUES (?, ?)`,
      [userId, orderNumber]
    );

    const orderId = result.insertId;
    const orderItems = products.map((product) => [
      orderId,
      product.productId,
      product.quantity,
    ]);

    await dataSource.query(
      `INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`,
      [orderItems]
    );
  } catch (error) {
    throw new Error("Error_ saveOrder /ordersDao");
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  updateUserPoints,
  updateProductStock,
  saveOrder,
};


