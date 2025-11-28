const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      lastLogin: user.lastLogin,
    };

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token: "mock-jwt-token-" + user._id,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      password,
      name: name || email.split("@")[0],
      role: "user",
    });

    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      lastLogin: user.lastLogin,
    };

    res.json({
      success: true,
      data: userResponse,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
