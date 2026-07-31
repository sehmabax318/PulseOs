import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/user.model";
import { LoginUserDto, RegisterUserDto } from "./auth.types";

class AuthService {
  /**
   * Register User
   */
  async register(data: RegisterUserDto) {
    // Check if email already exists
    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    console.log("REGISTER DATA:", data);

    // Create user
const user = await User.create({
  name: data.name,
  email: data.email,
  password: data.password,
  phone: data.phone,
  role: data.role,
});

console.log("Saved Role:", user.role);

    return {
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Login User
   */
  async login(data: LoginUserDto) {
    // Find user by email
const user = await User.findOne({
  email: data.email,
}).select("+password");


    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return {
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

export default new AuthService();