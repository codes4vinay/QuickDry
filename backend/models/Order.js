const mongoose = require("mongoose");
const { createOrderId, estimatedDeliveryDate } = require("../utils/orderUtils");

const ORDER_STATUSES = ["RECEIVED", "PROCESSING", "READY", "DELIVERED", "CANCELLED"];

const garmentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, index: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", index: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    garments: {
      type: [garmentSchema],
      validate: { validator: (items) => items.length > 0, message: "At least one garment is required" }
    },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ORDER_STATUSES, default: "RECEIVED", index: true },
    estimatedDelivery: { type: Date, required: true }
  },
  { timestamps: true }
);

// Compound index for store orders
orderSchema.index({ storeId: 1, status: 1 });

orderSchema.pre("validate", function prepareOrder() {
  this.garments = this.garments.map((item) => {
    const quantity = Number(item.quantity);
    const price = Number(item.price);
    return { type: item.type, quantity, price, subtotal: quantity * price };
  });

  this.totalAmount = this.garments.reduce((sum, item) => sum + item.subtotal, 0);
  if (!this.orderId) this.orderId = createOrderId();
  if (!this.estimatedDelivery) this.estimatedDelivery = estimatedDeliveryDate();
});

module.exports = { Order: mongoose.model("Order", orderSchema), ORDER_STATUSES };
