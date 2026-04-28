const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    getStoreGarments,
    createGarment,
    updateGarment,
    deleteGarment,
    getAdminGarments
} = require("../controllers/garmentController");

const router = express.Router();

// Get garments for a store (public - by storeId param)
router.get("/store/:storeId", getStoreGarments);

// Admin routes
router.get("/admin/all", protect, getAdminGarments);
router.post("/admin/create", protect, createGarment);
router.put("/admin/:id", protect, updateGarment);
router.delete("/admin/:id", protect, deleteGarment);

module.exports = router;
