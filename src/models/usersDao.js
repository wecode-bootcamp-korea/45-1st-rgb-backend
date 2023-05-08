const dataSource = require("../models/dataSource");

const getUserData = async (userId) => {
  try {
    const [user] = await dataSource.query(
      `SELECT id, email, subscription, first_name, last_name, profile_image_url, address, postalcode, cellphone, sex, points, created_at, updated_at, is_active
      FROM users
      WHERE id = ?`,
      [userId]
    );

    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error getting user data in ordersDAO " + err.message);
  }
};

const signUp = async (email, password, firstName, lastName, subscription, points) => {
  try {
    await dataSource.query(
      `INSERT INTO users(
        email,
        subscription,
        password,
        first_name,
        last_name,
        points
      )VALUES (?,?,?,?,?,?);
      `,
      [email, subscription, password, firstName, lastName, points]
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

const getUserById = async (userId) => {
  try {
    const [user] = await dataSource.query(
      `SELECT id
      FROM users
      WHERE id = ?`,
      [userId]
    );
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting user by ID usersDAO " + err.message);
  }
};

const addUserAddress = async (userId, address, postalCode) => {
  try {
    await dataSource.query(
      `UPDATE users
        SET
          address = ?,
          postalcode = ?
        WHERE id = ?`,
      [address, postalCode, userId]
    );
  } catch (err) {
    console.log(err);
    throw new Error("Error updating address for User usersDAO " + err.message);
  }
};

module.exports = {
  getUserData,
  signUp,
  getUserByEmail,
  getUserById,
  addUserAddress,
};
