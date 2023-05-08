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

const modifyQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productsId, calculation } = req.body;
    if (!userId || !productsId || !calculation) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const modifyQuantity = await cartService.modifyQuantity(
      userId,
      productsId,
      calculation
    );

    return res.status(201).json({ modifyQuantity });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createCart,
  modifyQuantity,
};
