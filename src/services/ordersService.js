const ordersDao = require("../models/ordersDao");
const productsDao = require("../models/productsDao")

const getProductsPrices = async (products) => {
  const productIds = products.map(product => product.productId);
  const productPrices = await ordersDao.getProductsPrices(productIds);

  const pricesById = {};
  productPrices.forEach(product => {
    pricesById[product.id] = product.price;
  });

  return products.map(product => ({
    ...product,
    price: pricesById[product.productId]
  }));
};

const calculatePoints = (products) => {
  let points = 0;
  products.forEach(product => {
    points += product.quantity * product.price; // Modify as needed
  });
  return points;
};

const updateUserPoints = async (userId, points) => {
  try {
    await ordersDao.updateUserPoints(userId, points);
  } catch (err) {
    throw new Error("Error_ updateUserPoints /ordersService");
  }
};

const updateProductStock = async (products) => {
  try {
    for (const product of products) {
      const { productId, quantity } = product;

      if (!productId || !quantity) {
        throw new Error('Missing product ID or quantity');
      }

      const currentProduct = await productsDao.getProduct(productId);

      if (!currentProduct) {
        throw new Error(`Product not found for ID: ${productId}`);
      }

      const updatedQuantity = currentProduct.quantity - quantity;

      if (updatedQuantity < 0) {
        throw new Error(`Insufficient stock for product ID: ${productId}`);
      }

      await ordersDao.updateProductStock(productId, updatedQuantity);
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Error_ updateProductStock /ordersService: ${err.message}`);
  }
};

const saveOrder = async (userId, orderNumber, products) => {
  try {
    await ordersDao.saveOrder(userId, orderNumber, products);
  } catch (err) {
    console.log(err);
    throw new Error("Error_ saveOrder /ordersService");
  }
};


module.exports = {
  calculatePoints,
  updateUserPoints,
  updateProductStock,
  saveOrder,
  getProductsPrices
};