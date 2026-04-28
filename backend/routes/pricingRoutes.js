const express = require("express");
const { getPricing, updatePricing } = require("../controllers/pricingController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getPricing);
router.put("/", protect, authorize("ADMIN"), updatePricing);

module.exports = router;
