const dataSource = require("../models/dataSource")

const addUserAddress = async (userId, addressInfo, postalCode) => {
  try {
    const [user] = await dataSource.query(
      `SELECT id FROM users WHERE id = ?`,
      [userId]
    );

    if (user) {
      const user_id = user.id;

      await dataSource.query(
        `INSERT INTO users(
      address,
      postalcode,
    ) VALUES (
      ?,
      ?
    )`,
        [user_id, address, postalCode]
      );

      return { message: "🎉 post has been created successfully 🎉 " };
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error adding address for User ordersDAO " + err.message);
  }
};

module.exports = {
  addUserAddress
}

