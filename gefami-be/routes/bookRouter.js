const express = require("express");
const router = express.Router();
const Controller = require("../controllers/bookController");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate, Controller.getBook);
router.post("/", authenticate, Controller.addBook);

module.exports = router;
