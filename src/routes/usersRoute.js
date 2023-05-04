const express = require("express");

const usersController = require("../controllers/usersController");
const router = express.Router();

router.post("/signUp", usersController.signUp);
router.post("/logIn", usersController.logIn);

module.exports = {
  router,
};
