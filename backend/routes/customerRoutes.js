const express = require("express");
const { listCustomers } = require("../controllers/customerController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorize("ADMIN"), listCustomers);

module.exports = router;
