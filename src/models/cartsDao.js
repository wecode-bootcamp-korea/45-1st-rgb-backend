const dataSource = require("./dataSource");

const cartIn = async (userId, productsId) => {
  try {
    return await dataSource.query(
      `INSERT INTO cart(
        users_id,
        products_id
      )VALUES (?,?)`,
      [userId, productsId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

const cartInfo = async (userId) => {
  try {
    return await dataSource.query(
      `SELECT 
        cart.products_id as id, 
        SUM(cart.quantity) as cartSum, 
        products.title, 
        products.products_size_left as width, 
        products.products_size_right as height, 
        products.quantity as inventory, products.price as individualPrice 
          FROM cart JOIN products ON cart.products_id = products.id 
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
  cartIn,
  cartInfo,
};
