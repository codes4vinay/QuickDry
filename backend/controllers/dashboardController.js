const { Order, ORDER_STATUSES } = require("../models/Order");

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function statusObject(rows) {
  return ORDER_STATUSES.reduce((acc, status) => {
    acc[status] = rows.find((row) => row._id === status)?.count || 0;
    return acc;
  }, {});
}

async function customerDashboard(req, res, next) {
  try {
    const customerId = req.user._id;
    const [summary] = await Order.aggregate([
      { $match: { customerId } },
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                activeOrders: { $sum: { $cond: [{ $in: ["$status", ["RECEIVED", "PROCESSING", "READY"]] }, 1, 0] } },
                deliveredOrders: { $sum: { $cond: [{ $eq: ["$status", "DELIVERED"] }, 1, 0] } },
                pendingBills: { $sum: { $cond: [{ $ne: ["$status", "DELIVERED"] }, "$totalAmount", 0] } }
              }
            }
          ],
          statuses: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
          recent: [{ $sort: { createdAt: -1 } }, { $limit: 5 }]
        }
      }
    ]);

    res.json({
      ...(summary.totals[0] || { totalOrders: 0, activeOrders: 0, deliveredOrders: 0, pendingBills: 0 }),
      ordersByStatus: statusObject(summary.statuses),
      recentOrders: summary.recent
    });
  } catch (error) {
    next(error);
  }
}

async function adminDashboard(_req, res, next) {
  try {
    const today = startOfToday();
    const [summary] = await Order.aggregate([
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                totalRevenue: { $sum: "$totalAmount" },
                deliveredOrders: { $sum: { $cond: [{ $eq: ["$status", "DELIVERED"] }, 1, 0] } },
                pendingOrders: { $sum: { $cond: [{ $in: ["$status", ["RECEIVED", "PROCESSING", "READY"]] }, 1, 0] } },
                ordersToday: { $sum: { $cond: [{ $gte: ["$createdAt", today] }, 1, 0] } }
              }
            }
          ],
          statuses: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
          monthlyRevenue: [
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, revenue: { $sum: "$totalAmount" } } },
            { $sort: { _id: 1 } },
            { $limit: 12 }
          ],
          dailyOrders: [
            { $group: { _id: { $dateToString: { format: "%d %b", date: "$createdAt" } }, orders: { $sum: 1 } } },
            { $sort: { _id: 1 } },
            { $limit: 14 }
          ]
        }
      }
    ]);

    res.json({
      ...(summary.totals[0] || { totalOrders: 0, totalRevenue: 0, ordersToday: 0, deliveredOrders: 0, pendingOrders: 0 }),
      ordersByStatus: statusObject(summary.statuses),
      monthlyRevenue: summary.monthlyRevenue.map((item) => ({ month: item._id, revenue: item.revenue })),
      dailyOrders: summary.dailyOrders.map((item) => ({ day: item._id, orders: item.orders }))
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { customerDashboard, adminDashboard };
