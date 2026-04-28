const Store = require("../models/Store");
const User = require("../models/User");

// Get store details
exports.getStore = async (req, res, next) => {
    try {
        const store = await Store.findById(req.user.storeId).populate("adminId", "name email phone");
        if (!store) return res.status(404).json({ message: "Store not found" });
        res.json(store);
    } catch (error) {
        next(error);
    }
};

// Update store details
exports.updateStore = async (req, res, next) => {
    try {
        const { name, email, phone, address, city } = req.body;
        const store = await Store.findByIdAndUpdate(
            req.user.storeId,
            { name, email, phone, address, city },
            { new: true, runValidators: true }
        );
        res.json(store);
    } catch (error) {
        next(error);
    }
};

// Get all stores (super admin only)
exports.getAllStores = async (req, res, next) => {
    try {
        const stores = await Store.find().populate("adminId", "name email phone");
        res.json(stores);
    } catch (error) {
        next(error);
    }
};
