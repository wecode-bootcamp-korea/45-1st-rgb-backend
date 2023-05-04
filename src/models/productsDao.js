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
        products.max_quantity
      FROM products 
      INNER JOIN categories ON categories.id = products.categories_id
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
      products.max_quantity
      FROM products
      WHERE products.id = ?
      `,
      [productId]
    );

    return product;
  } catch (error) {
    throw new Error("Error has occurred in getting Specific Products /productsDao");
  }
};


module.exports = {
  getAllProducts, getProduct
}

