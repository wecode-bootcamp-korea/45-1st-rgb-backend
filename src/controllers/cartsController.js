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

const subtract = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.body;

    if (!userId || !id) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const subtract = await cartService.subtract(id, userId);

    return res.status(201).json({ subtract });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createCart,
  subtract,
};
