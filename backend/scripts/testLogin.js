const axios = require("axios");

const testLogin = async () => {
  try {
    console.log("Testing login API...\n");

    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: "dangechetan3@gmail.com",
      password: "chetan3242#",
    });

    console.log("✓ Login successful!");
    console.log("Response:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("❌ Login failed:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

testLogin();
