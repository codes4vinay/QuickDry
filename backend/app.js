require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const customerRoutes = require("./routes/customerRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const storeRoutes = require("./routes/storeRoutes");
const garmentRoutes = require("./routes/garmentRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "LaundryPro API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/garments", garmentRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
