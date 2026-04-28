const User = require("../models/User");
const { Order } = require("../models/Order");

async function listCustomers(_req, res, next) {
  try {
    const rows = await User.aggregate([
      { $match: { role: "CUSTOMER" } },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders"
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          createdAt: 1,
          totalOrders: { $size: "$orders" },
          totalSpent: { $sum: "$orders.totalAmount" }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

module.exports = { listCustomers };
