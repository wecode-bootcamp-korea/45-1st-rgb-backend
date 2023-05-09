const cartService = require("../services/cartsService");

const createCart = async (req, res) => {
  try {
    const userId = req.userId;

    const { productsId, quantity } = req.body;

    if (!userId || !productsId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const createCart = await cartService.createCart(
      userId,
      productsId,
      quantity
    );
    return res.status(201).json({ createCart });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const cartInfo = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const result = await cartService.cartInfo(userId);
    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;

    const { cartId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const result = await cartService.deleteProduct(userId, cartId);
    return res.status(202).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  cartInfo,
  createCart,
  deleteProduct,
};
