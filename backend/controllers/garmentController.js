const Garment = require("../models/Garment");

// Get garments for a store
exports.getStoreGarments = async (req, res, next) => {
    try {
        const storeId = req.params.storeId || req.user.storeId;

        const garments = await Garment.find({
            storeId,
            isActive: true
        });

        res.json(garments);
    } catch (error) {
        next(error);
    }
};

// Create garment (admin only)
exports.createGarment = async (req, res, next) => {
    try {
        const { name, category, basePrice, description } = req.body;

        const garment = new Garment({
            storeId: req.user.storeId,
            name,
            category,
            basePrice,
            description
        });

        await garment.save();
        res.status(201).json(garment);
    } catch (error) {
        next(error);
    }
};

// Update garment (admin only)
exports.updateGarment = async (req, res, next) => {
    try {
        const garment = await Garment.findOne({
            _id: req.params.id,
            storeId: req.user.storeId
        });

        if (!garment) {
            return res.status(404).json({ message: "Garment not found" });
        }

        Object.assign(garment, req.body);
        await garment.save();
        res.json(garment);
    } catch (error) {
        next(error);
    }
};

// Delete garment (admin only)
exports.deleteGarment = async (req, res, next) => {
    try {
        const garment = await Garment.findOneAndDelete({
            _id: req.params.id,
            storeId: req.user.storeId
        });

        if (!garment) {
            return res.status(404).json({ message: "Garment not found" });
        }

        res.json({ message: "Garment deleted" });
    } catch (error) {
        next(error);
    }
};

// Get all garments for admin
exports.getAdminGarments = async (req, res, next) => {
    try {
        const garments = await Garment.find({ storeId: req.user.storeId });
        res.json(garments);
    } catch (error) {
        next(error);
    }
};
