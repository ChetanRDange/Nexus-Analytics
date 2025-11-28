const express = require("express");
const router = express.Router();

// Public routes - no authentication required
router.get("/public/brand", (req, res) => {
  res.json({
    success: true,
    data: {
      brandName: "Blackcoffer",
      logo: "/assets/images/logo.png",
      favicon: "/assets/images/favicon.ico",
      primaryColor: "#7C3AED",
      secondaryColor: "#06B6D4",
      theme: "light",
    },
  });
});

// Protected routes - would normally require authentication
router.get("/protect/profile", (req, res) => {
  // For demo purposes, return a mock profile
  // In production, you'd verify the JWT token and return actual user data
  res.json({
    success: true,
    data: {
      id: "demo-user-123",
      name: "Demo User",
      email: "demo@blackcoffer.com",
      role: "admin",
      avatar: null,
      permissions: ["dashboard", "analytics", "reports"],
      createdAt: new Date().toISOString(),
    },
  });
});

// Get admin settings
router.get("/settings", (req, res) => {
  res.json({
    success: true,
    data: {
      siteName: "Blackcoffer Dashboard",
      timezone: "UTC",
      dateFormat: "YYYY-MM-DD",
      language: "en",
    },
  });
});

module.exports = router;
