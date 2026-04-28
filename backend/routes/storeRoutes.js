const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getStore, updateStore, getAllStores } = require("../controllers/storeController");

const router = express.Router();

router.get("/", protect, getStore);
router.put("/", protect, updateStore);
router.get("/all", getAllStores);

module.exports = router;