const express = require("express");

const router = express.Router();

const cartsController = require("../controllers/cartsController");
const { checkToken } = require("../middlewares/auth");

router.post("/:productsId", checkToken, cartsController.cartIn);

module.exports = {
  router,
};
