const express = require("express");

const usersRouter = require("./usersRoute");
const productsRouter = require("./productsRoute");
const cartsRouter = require("./cartsRoute");

const router = express.Router();
router.use("/users", usersRouter.router);
router.use("/products", productsRouter.router);
router.use("/carts", cartsRouter.router);

module.exports = router;
