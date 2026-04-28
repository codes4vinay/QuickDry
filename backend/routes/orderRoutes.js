const express = require("express");
const { body } = require("express-validator");
const { createOrder, listOrders, getOrder, updateOrder, updateStatus, deleteOrder } = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const router = express.Router();

const orderValidation = [
  body("customerName").trim().notEmpty().withMessage("Customer name is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("address").trim().isLength({ min: 5 }).withMessage("Pickup address is required"),
  body("garments").isArray({ min: 1 }).withMessage("At least one garment is required"),
  body("garments.*.type").trim().notEmpty().withMessage("Garment type is required"),
  body("garments.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("garments.*.price").isFloat({ min: 0 }).withMessage("Price must be valid")
];

router.use(protect);
router.route("/").post(orderValidation, validate, createOrder).get(listOrders);
router.route("/:id").get(getOrder).put(orderValidation, validate, updateOrder).delete(authorize("ADMIN"), deleteOrder);
router.patch("/:id/status", authorize("ADMIN"), updateStatus);

module.exports = router;
