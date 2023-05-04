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

module.exports = {
  signUp,
  getUserByEmail,
};
