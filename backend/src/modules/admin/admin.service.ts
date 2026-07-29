import User from "../../models/user.model";
import {
  CreateUserInput,
  UpdateUserInput,
} from "./admin.types";

/**
 * Create Doctor / Receptionist / Admin
 */
export const createUser = async (
  data: CreateUserInput
) => {
  // Check if email already exists
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Only Admin can create these roles
  if (
    !["doctor", "receptionist", "admin"].includes(data.role)
  ) {
    throw new Error("Invalid role");
  }

  // Create user
  const user = await User.create(data);

  // Hide password
  return User.findById(user._id).select("-password");
};

/**
 * Get All Users
 */
export const getAllUsers = async () => {
  return await User.find().select("-password");
};

/**
 * Get User By ID
 */
export const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update User
 */
export const updateUser = async (
  id: string,
  data: UpdateUserInput
) => {
  const user = await User.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Activate / Deactivate User
 */
export const changeUserStatus = async (
  id: string,
  isActive: boolean
) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      isActive,
    },
    {
      new: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Delete User
 */
export const deleteUser = async (
  id: string
) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    message: "User deleted successfully",
  };
};