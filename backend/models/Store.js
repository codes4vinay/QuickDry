const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
