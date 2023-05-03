const productsDao = require('../models/productsDao')

const getAllProducts = async () => {
  try {
    const products = await productsDao.getAllProducts();
    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Error has occurred in getting All Products /productService/getAllProducts")
  }
};


const createProducts = async (categoryId, artistName, title, description,
  productsSizeLeft, productsSizeRight, price, material, quantity, maxQuantity) => {
  try {
    const productsCreate = await productsDao.createProducts(
      categoryId,
      artistName,
      title,
      description,
      productsSizeLeft,
      productsSizeRight,
      price,
      material,
      quantity,
      maxQuantity
    );
    return productsCreate;
  } catch (err) {
    console.log(err);
    throw new Error("Error has occurred in CREATING PRODUCTS /productService/creatingProducts");
  }
};

module.exports = {
  getAllProducts,
}

