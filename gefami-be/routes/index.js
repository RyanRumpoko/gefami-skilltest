const express = require("express");
const router = express.Router();
const user = require("./userRouter");
const book = require("./bookRouter");
const customer = require("./customerRouter");

router.use("/", user);
router.use("/book", book);
router.use("/customer", customer);

module.exports = router;
