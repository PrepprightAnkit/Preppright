import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/student.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user by email
  const user = await User.findOne({ email });

  // If user not found, return error
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Compare passwords
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // Generate JWT token
  const token = user.generateJWT();

  // Return token and additional user data if needed
  res.json(new ApiResponse(200, { token, user }, "Login successful"));
});

export {
  loginUser,
};
