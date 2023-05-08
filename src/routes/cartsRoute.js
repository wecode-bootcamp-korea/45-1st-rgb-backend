const express = require("express");

const router = express.Router();

const cartsController = require("../controllers/cartsController");
const { checkToken } = require("../middlewares/auth");

router.get("", checkToken, cartsController.cartInfo);
router.post("", checkToken, cartsController.createCart);

module.exports = {
  router,
};
