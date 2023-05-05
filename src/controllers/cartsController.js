const cartService = require("../services/cartsService");

const cartIn = async (req, res) => {
  try {
    const userId = req.userId;

    const { productsId } = req.params;

    if (!userId || !productsId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await cartService.cartIn(userId, productsId);
    return res.status(201).json({ message: "SUCCESS_CART_IN" });
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
module.exports = {
  cartIn,
  cartInfo,
};
