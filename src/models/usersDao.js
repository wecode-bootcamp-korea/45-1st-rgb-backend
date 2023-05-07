const dataSource = require("./dataSource");

const signUp = async (
  email,
  password,
  firstName,
  lastName,
  subscription,
  points
) => {
  try {
    await dataSource.query(
      `INSERT INTO users(
        email,
        password,
        first_name,
        last_name,
        subscription,
        points
      )VALUES (?,?,?,?,?,?);
      `,
      [email, password, firstName, lastName, subscription, points]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [userInfo] = await dataSource.query(
      `SELECT
      id,
      email,
      password,
      points,
      first_name,
      last_name,
      subscription
      FROM users
      WHERE users.email = ?`,
      [email]
    );
    return userInfo;
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

const addUserAddress = async (userId, address, postalCode) => {
  try {
    const [user] = await dataSource.query(
      `SELECT id, address, postalcode AS postalCode
      FROM users
      WHERE id = ?`,
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
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error updating address for User usersDAO " + err.message);
  }
};

module.exports = {
  signUp,
  getUserByEmail,
  addUserAddress
};
