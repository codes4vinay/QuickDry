const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", index: true },
    type: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

// Unique constraint per store
pricingSchema.index({ storeId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("Pricing", pricingSchema);
