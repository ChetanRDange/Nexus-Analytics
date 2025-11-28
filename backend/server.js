require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboard");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Blackcoffer Data Visualization Dashboard API",
    version: "1.0.0",
    status: "running",
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server: http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  process.exit(1);
});

startServer();

module.exports = app;
