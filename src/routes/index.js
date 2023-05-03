const express = require("express");

const usersRouter = require("./usersRoute");

const productsRouter = require("./productsRoute");

const router = express.Router();
router.use("/users", usersRouter.router);
router.use("/products", productsRouter.router);

module.exports = router;
