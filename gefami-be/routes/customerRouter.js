const express = require("express");
const router = express.Router();
const Controller = require("../controllers//customerController");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate, Controller.getCustomer);
router.post("/", authenticate, Controller.addCustomer);

module.exports = router;
