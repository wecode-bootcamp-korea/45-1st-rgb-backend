const dataSource = require("./dataSource");

const signUp = async (email, password, points) => {
  try {
    console.log(password + "" + "DAo");
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
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  signUp,
};
