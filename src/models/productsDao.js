const dataSource = require("../models/dataSource");

const getAllProducts = async (limit, offset, category) => {
  let whereClause = "";
  let categoryValues = [];

  if (category) {
    whereClause = "WHERE categories.name = ?";
    categoryValues = [category];
  }

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
      ${whereClause}
      GROUP BY products.id
      LIMIT ? OFFSET ?;
      `,
      [...categoryValues, parseInt(limit), parseInt(offset)]
    );
    return rows;
  } catch (err) {
    throw new Error("Error has occurred in getting products in productsDao/getAllProducts");
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
    throw new Error("Error has occurred in getting specific product in productsDao/getProduct");
  }
};

module.exports = {
  getAllProducts,
  getProduct,
};
