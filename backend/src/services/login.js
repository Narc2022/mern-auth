const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    generateToken(existingUser);
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error("Invalid credentials");
  }
}

module.exports = {
  login,
};
