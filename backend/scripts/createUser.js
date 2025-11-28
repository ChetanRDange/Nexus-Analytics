require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ MongoDB connected");

    const existingUser = await User.findOne({
      email: "dangechetan3@gmail.com",
    });

    if (existingUser) {
      console.log("User already exists. Updating password...");
      existingUser.password = "chetan3242#";
      existingUser.name = "Chetan Dange";
      existingUser.role = "admin";
      existingUser.isActive = true;
      await existingUser.save();
      console.log("✓ User updated successfully");
    } else {
      const user = await User.create({
        email: "dangechetan3@gmail.com",
        password: "chetan3242#",
        name: "Chetan Dange",
        role: "admin",
        isActive: true,
      });
      console.log("✓ User created successfully");
      console.log("User details:", {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    }

    await mongoose.connection.close();
    console.log("✓ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createUser();
