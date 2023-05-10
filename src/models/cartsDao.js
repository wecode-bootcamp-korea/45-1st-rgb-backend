const dataSource = require("./dataSource");

const cartInfo = async (userId) => {
  try {
    return await dataSource.query(
      `SELECT 
        carts.id,
        carts.products_id ,
        carts.quantity as count, 
        products.title, 
        products.products_size_left as width, 
        products.products_size_right as height, 
        products_images.image_url as image,
        products.quantity as inventory, 
        products.price as price 
          FROM products 
          JOIN carts ON carts.products_id = products.id 
          JOIN products_images ON products.id = products_images.products_id
          WHERE users_id = ?
          GROUP BY products_id,products_images.image_url,carts.id
      `,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

const createCart = async (userId, productsId, quantity) => {
  try {
    const result = await dataSource.query(
      `INSERT INTO carts
      (users_id, products_id , quantity) 
      VALUE (? , ? , ?) 
      ON DUPLICATE KEY 
      UPDATE quantity = quantity + ${quantity}
     `,
      [userId, productsId, quantity]
    );

    return await dataSource.query(
      `SELECT 
        carts.id,
        users_id,
        products_id,
        quantity
        FROM carts
        WHERE users_id = ?
      `,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

const modifyQuantity = async (userId, cartId, count) => {
  try {
    await dataSource.query(
      `UPDATE carts
        SET quantity = ?
        WHERE users_id= ? AND carts.id = ?
      `,
      [count, userId, cartId]
    );

    return await dataSource.query(
      `SELECT 
        carts.id,
        carts.products_id, 
        carts.quantity as count
      FROM carts
      WHERE users_id = ?
        `,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

const deleteCart = async (userId, cartId) => {
  try {
    await dataSource.query(
      `DELETE
        FROM carts
        WHERE users_id = ? AND carts.id = ?`,
      [userId, cartId]
    );

    return await dataSource.query(
      `SELECT  
      carts.id,
      carts.products_id ,
      carts.quantity as count 
    FROM carts 
    WHERE users_id = ?
    GROUP BY products_id
    `,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createCart,
  modifyQuantity,
  cartInfo,
  deleteCart,
};
