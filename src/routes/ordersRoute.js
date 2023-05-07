const express = require("express");
const ordersController = require("../controllers/ordersController");
const { checkToken } = require("../middlewares/auth")

const router = express.Router();


module.exports = {
  router,
};
