const express = require("express");

const usersRouter = require("./usersRoute");
const productsRouter = require("./productsRoute");
const ordersRouter = require("./ordersRoute");

const router = express.Router();

router.use("/users", usersRouter.router);
router.use("/products", productsRouter.router);
router.use("/orders", ordersRouter.router);

module.exports = router;
