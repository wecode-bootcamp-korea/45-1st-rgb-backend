const express = require("express");
const ordersController = require("../controllers/ordersController");

const router = express.Router();

router.post("", validateToken, ordersController.addUserAddress);

module.exports = {
  router,
};
