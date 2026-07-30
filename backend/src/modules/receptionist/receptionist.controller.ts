import { Request, Response } from "express";
import ReceptionistService from "./receptionist.service";

class ReceptionistController {
  /**
   * Verify QR
   */
  async verifyQR(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const result = await ReceptionistService.verifyQR(token);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Check-In Patient
   */
  async checkInPatient(req: Request, res: Response) {
  try {
    console.log("Params:", req.params);
    console.log("ID:", req.params.id);
    console.log("Length:", req.params.id?.length);

    const result = await ReceptionistService.checkInPatient(
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
  /**
   * Get Queue
   */
  async getQueue(req: Request, res: Response) {
    try {
      const result =
        await ReceptionistService.getQueue();

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ReceptionistController();