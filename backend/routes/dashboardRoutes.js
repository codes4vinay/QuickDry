const express = require("express");
const { adminDashboard, customerDashboard } = require("../controllers/dashboardController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/customer", protect, authorize("CUSTOMER", "ADMIN"), customerDashboard);
router.get("/admin", protect, authorize("ADMIN"), adminDashboard);

module.exports = router;
