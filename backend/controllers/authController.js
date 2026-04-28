const User = require("../models/User");
const generateToken = require("../utils/tokens");

function userPayload(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role
  };
}

async function register(req, res, next) {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409);
      throw new Error("Email is already registered");
    }

    const user = await User.create({ name, email, password, phone, role: "CUSTOMER" });

    res.status(201).json({ user: userPayload(user), token: generateToken(user) });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    const isValid = user ? await user.comparePassword(password) : false;

    if (!isValid) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json({ user: userPayload(user), token: generateToken(user) });
  } catch (error) {
    next(error);
  }
}

function me(req, res) {
  res.json({ user: userPayload(req.user) });
}

module.exports = { register, login, me };
