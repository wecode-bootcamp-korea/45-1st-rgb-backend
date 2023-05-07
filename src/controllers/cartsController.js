const cartService = require("../models/cartsDao");

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

const cartUpdate = async (req,res) =>{
  try{
    const userId = req.userId ;
    const { productsId } = req.body

    if(!userId || !productsId) {
      return res.stats(400).json({ message: "KEY_ERROR" });
    }

    const cartUpdate = await cartService.cartUpdate(
      userId,
      productsId
    );
    return res.status(201.json({cartUpdate}))
  }catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = {
  createCart,
  cartUpdate
};
