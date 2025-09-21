import prisma from "../config/db.config.ts";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "../validations/authValidation.ts";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const body = await req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);

      // check if email exists
      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findUser) {
        return res.status(400).json({
          erros: {
            email: "Email already exists",
          },
        });
      }

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(payload.password, salt);

      // store user in db
      const user = await prisma.users.create({
        data: payload,
      });

      return res.json({
        status: 200,
        message: "User Created Successfully",
        user,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({
          errors: error.messages,
        });
      } else {
        return res.status(500).json({
          message: "Something went wrong",
          error,
        });
      }
    }
  }
}

export default AuthController;
