const mongoose = require("mongoose");

const garmentSchema = new mongoose.Schema(
    {
        storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true, index: true },
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        basePrice: { type: Number, required: true, min: 0 },
        description: { type: String, trim: true },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

// Compound index for store-specific queries
garmentSchema.index({ storeId: 1, isActive: 1 });

module.exports = mongoose.model("Garment", garmentSchema);
