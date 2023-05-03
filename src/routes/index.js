const express = require("express");

const usersRouter = require("./usersRoute");

const router = express.Router();

router.use("/users", usersRouter.router);

module.exports = router;
