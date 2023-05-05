const express = require("express");
const ordersController = require("../controllers/ordersController");
const { checkToken } = require("../middlewares/auth")

const router = express.Router();

router.post("", ordersController.addUserAddress);

module.exports = {
  router,
};
