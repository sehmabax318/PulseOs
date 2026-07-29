import { Request, Response } from "express";
import * as AdminService from "./admin.service";

export const createUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await AdminService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await AdminService.getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await AdminService.getUserById(req.params.id as string);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
   const user = await AdminService.updateUser(
  req.params.id as string,
  req.body
);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeUserStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await AdminService.changeUserStatus(
      req.params.id as string,
      req.body.isActive
    );

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await AdminService.deleteUser(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};