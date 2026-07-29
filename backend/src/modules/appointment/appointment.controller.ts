import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import AppointmentService from "./appointment.service";

class AppointmentController {
  /**
   * Create Appointment
   */
async createAppointment(req: AuthRequest, res: Response) {
    try {
   const patientId = req.user!.id;

      const result = await AppointmentService.createAppointment(
        patientId,
        req.body
      );

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Get All Appointments
   */
  async getAppointments(req: Request, res: Response) {
    try {
      const result = await AppointmentService.getAppointments();

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Update Appointment Status
   */
  async updateStatus(req: Request, res: Response) {
    try {
      const result = await AppointmentService.updateStatus(
       req.params.id as string,
        req.body
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AppointmentController();