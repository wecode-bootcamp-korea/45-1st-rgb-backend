const express = require("express");

const productsRouter = require("./productsRoute");

const router = express.Router();

router.use("/products", productsRouter.router);

module.exports = router;