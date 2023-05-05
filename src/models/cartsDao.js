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

module.exports = {
  cartIn,
};
