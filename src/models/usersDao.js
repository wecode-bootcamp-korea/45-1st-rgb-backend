const dataSource = require("./dataSource");

const signUp = async (email, password, points) => {
  try {
    await dataSource.query(
      `INSERT INTO users(
        email,
        password,
        points
      )VALUES (?,?,?);
      `,
      [email, password, points]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  signUp,
};
