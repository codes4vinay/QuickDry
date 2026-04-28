const Pricing = require("../models/Pricing");

async function getPricing(_req, res, next) {
  try {
    const pricing = await Pricing.find().sort({ type: 1 });
    res.json(pricing);
  } catch (error) {
    next(error);
  }
}

async function updatePricing(req, res, next) {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (items.length === 0) {
      res.status(400);
      throw new Error("Pricing items are required");
    }

    await Promise.all(
      items.map((item) =>
        Pricing.findOneAndUpdate(
          { type: item.type },
          { type: item.type, price: Number(item.price) },
          { upsert: true, new: true, runValidators: true }
        )
      )
    );

    const pricing = await Pricing.find().sort({ type: 1 });
    res.json(pricing);
  } catch (error) {
    next(error);
  }
}

module.exports = { getPricing, updatePricing };
