const dataSource = require("../models/dataSource")

const addUserAddress = async (userId, address, postalCode) => {
  try {
    const [user] = await dataSource.query(
      `SELECT id FROM users WHERE id = ?`,
      [userId]
    );

    if (user) {
      const user_id = user.id;

      await dataSource.query(
        `UPDATE users
        SET
          address = ?,
          postalcode = ?
        WHERE id = ?`,
        [address, postalCode, user_id]
      );

      return { message: "🎉 Address has been updated successfully 🎉 " };
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error updating address for User ordersDAO " + err.message);
  }
};

module.exports = {
  addUserAddress
}
