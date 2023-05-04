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

const logIn = async (email) => {
  try {
    return await dataSource.query(
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
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  signUp,
  logIn,
};
