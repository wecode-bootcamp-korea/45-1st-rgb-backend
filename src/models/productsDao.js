const dataSource = require("../models/dataSource")


const getAllProducts = async () => {
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
      products.max_quantity
      FROM products 
      INNER JOIN categories ON categories.id = products.categories_id;
      `
    );
    return rows;
  } catch (err) {
    console.log(err);
    throw new Error("Error has occurred in getting All Products /productDao");
  }
};

module.exports = {
  getAllProducts,
}

