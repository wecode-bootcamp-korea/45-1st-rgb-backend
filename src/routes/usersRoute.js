const express = require("express");

const usersController = require("../controllers/usersController");
const { checkToken } = require("../middlewares/auth")

const router = express.Router();

router.post("/signUp", usersController.signUp);
router.post("/logIn", usersController.logIn);
router.post("/", checkToken, usersController.addUserAddress);

module.exports = {
  router,
};
