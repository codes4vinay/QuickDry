const express = require("express");
const { body } = require("express-validator");
const { register, login, me } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("phone").trim().isLength({ min: 7 }).withMessage("Phone number is required")
  ],
  validate,
  register
);

router.post(
  "/login",
  [body("email").isEmail().withMessage("Valid email is required"), body("password").notEmpty().withMessage("Password is required")],
  validate,
  login
);

router.get("/me", protect, me);

module.exports = router;
