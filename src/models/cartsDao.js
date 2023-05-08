const dataSource = require("./dataSource");

const createCart = async (userId, productsId, quantity) => {
  try {
    const result = await dataSource.query(
      `INSERT INTO cart(
        users_id,
        products_id,
        quantity
      )VALUES (?,?,?)
      `,
      [userId, productsId, quantity]
    );

    return await dataSource.query(
      `SELECT 
        id,
        users_id,
        products_id,
        quantity
        FROM cart
        WHERE id = ?
      `,
      [result.insertId]
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
};
