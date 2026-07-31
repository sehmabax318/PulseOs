import { Request, Response } from "express";
import DoctorService from "./doctor.service";

class DoctorController {
  /**
   * Get Today's Queue
   */
  async getTodayQueue(req: Request, res: Response) {
    try {
     const doctorId = req.user!.id;

      const result = await DoctorService.getTodayQueue(doctorId);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Start Consultation
   */
  async startConsultation(req: Request, res: Response) {
    console.log("🔥 DoctorController.startConsultation HIT");
    try {
  const doctorId = req.user!.id;

const result = await DoctorService.startConsultation(
req.params.id as string,
  doctorId
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
   * Complete Consultation
   */
  async completeConsultation(req: Request, res: Response) {
    try {
     const doctorId = req.user!.id;

const result = await DoctorService.completeConsultation(
   req.params.id as string,
  doctorId
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

export default new DoctorController();