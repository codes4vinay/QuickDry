const mongoose = require("mongoose");
const Pricing = require("../models/Pricing");

const defaultPrices = [
  { type: "Shirt", price: 100 },
  { type: "Pants", price: 150 },
  { type: "Saree", price: 250 },
  { type: "Coat", price: 300 },
  { type: "Blanket", price: 400 }
];

async function seedPricing() {
  const count = await Pricing.countDocuments();
  if (count === 0) {
    await Pricing.insertMany(defaultPrices);
  }
}

async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(process.env.MONGO_URI);
  await seedPricing();
  console.log("MongoDB connected");
}

module.exports = connectDB;
