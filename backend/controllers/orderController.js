const { Order, ORDER_STATUSES } = require("../models/Order");

function visibleOrderFilter(req, base = {}) {
  if (req.user.role === "CUSTOMER") {
    return { ...base, customerId: req.user._id };
  }
  return base;
}

function queryFilters(query) {
  const filters = {};
  if (query.status && ORDER_STATUSES.includes(query.status)) filters.status = query.status;
  if (query.search?.trim()) {
    const text = query.search.trim();
    filters.$or = [
      { orderId: { $regex: text, $options: "i" } },
      { customerName: { $regex: text, $options: "i" } },
      { phone: { $regex: text, $options: "i" } },
      { "garments.type": { $regex: text, $options: "i" } }
    ];
  }
  return filters;
}

async function createOrder(req, res, next) {
  try {
    const { customerName, phone, address, garments } = req.body;
    const order = await Order.create({
      customerId: req.user._id,
      customerName,
      phone,
      address,
      garments
    });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const filters = visibleOrderFilter(req, queryFilters(req.query));
    const orders = await Order.find(filters).populate("customerId", "name email phone").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await Order.findOne(visibleOrderFilter(req, { _id: req.params.id })).populate("customerId", "name email phone");
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { customerName, phone, address, garments, status } = req.body;
    const update = { customerName, phone, address, garments };
    if (req.user.role === "ADMIN" && status) update.status = status;

    const order = await Order.findOneAndUpdate(
      visibleOrderFilter(req, { _id: req.params.id }),
      update,
      { new: true, runValidators: true }
    );

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    if (!ORDER_STATUSES.includes(req.body.status)) {
      res.status(400);
      throw new Error(`Status must be one of ${ORDER_STATUSES.join(", ")}`);
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.json({ message: "Order deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, listOrders, getOrder, updateOrder, updateStatus, deleteOrder };
