const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.post("/signUp", usersController.signUp);

module.exports = {
  router,
};
