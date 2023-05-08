const express = require("express");

const router = express.Router();

const cartsController = require("../controllers/cartsController");
const { checkToken } = require("../middlewares/auth");

router.post("", checkToken, cartsController.createCart);
router.patch("", checkToken, cartsController.subtract);

module.exports = {
  router,
};
