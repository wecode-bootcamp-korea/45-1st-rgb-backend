const ordersService = require("../services/ordersService");

const addUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, postalCode } = req.body;


    if (!userId || !address || !postalCode) {
      return res.status(400).json({ message: 'USER_POSTS_DATA_IS_NOT_ENOUGH' });
    }

    await ordersService.addUserAddress(userId, address, postalCode);

    return res.status(202).json({
      message: 'SUCCESSFULLY CREATED USER POST'
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error_ addUserAddress /ordersController",
    });
  }
};

module.exports = {
  addUserAddress
}
