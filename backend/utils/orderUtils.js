const crypto = require("crypto");

function createOrderId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `LP-${date}-${suffix}`;
}

function estimatedDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date;
}

module.exports = { createOrderId, estimatedDeliveryDate };
