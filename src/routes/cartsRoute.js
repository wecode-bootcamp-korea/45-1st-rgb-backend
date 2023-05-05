const express = require("express");

const router = express.Router();

const cartsController = require("../controllers/cartsController");
const { checkToken } = require("../middlewares/auth");

router.post("/:productsId", checkToken, cartsController.cartIn);
router.get("", cartsController.cartInfo);

module.exports = {
  router,
};
