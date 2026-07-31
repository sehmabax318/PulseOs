import { Request, Response } from "express";
import PatientService from "./patient.service";

class PatientController {
  /**
   * Get Patient Profile
   */
  async getProfile(req: Request, res: Response) {
    try {
      const patientId = req.user!.id;

      const result = await PatientService.getProfile(patientId);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Update Patient Profile
   */
  async updateProfile(req: Request, res: Response) {
    try {
      const patientId = req.user!.id;

      const result = await PatientService.updateProfile(
        patientId,
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

  /**
   * Get My Appointments
   */
  async getAppointments(req: Request, res: Response) {
    try {
      const patientId = req.user!.id;

      const result = await PatientService.getAppointments(patientId);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Get Appointment Details
   */
  async getAppointmentById(req: Request, res: Response) {
    try {
      const patientId = req.user!.id;

      const result = await PatientService.getAppointmentById(
        patientId,
        req.params.id as string
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

export default new PatientController();