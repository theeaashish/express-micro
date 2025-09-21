import prisma from "../config/db.config.ts";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "../validations/authValidation.ts";
import type { Request, Response } from "express";

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const body = await req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);
      return res.json({ payload });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({
          errors: error.messages,
        });
      }
    }
  }
}

export default AuthController;