const ordersService = require("../services/ordersService");

const addUserAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address, postalCode } = req.body;


    if (!userId || !address || !postalCode) {
      return res.status(400).json({ message: 'USER_INPUT_DATA_IS_NOT_ENOUGH' });
    }

    await ordersService.addUserAddress(userId, address, postalCode);

    return res.status(202).json({
      message: 'SUCCESSFULLY UPDATED USERS ADDRESS'
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
