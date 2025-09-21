import prisma from "../config/db.config.ts";
import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/authValidation.ts";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const body = req.body;
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

  static async login(req: Request, res: Response) {
    try {
      const body = req.body;
      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);

      // check if email exists
      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findUser) {
        const isPasswordValid = await bcrypt.compare(
          payload.password,
          findUser.password
        );

        if (!isPasswordValid) {
          return res.status(400).json({
            errors: {
              email: "Invalid credentials",
            },
          });
        }

        // issue token to user
        const payloadData = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          profile: findUser.profile,
        };

        const token = jwt.sign(payloadData, process.env.JWT_SECRET as string, {
          expiresIn: "7d",
        });

        return res.json({
          status: 200,
          message: "Login Successful",
          access_token: `Bearer ${token}`,
        });
      }

      return res.status(400).json({
        errors: {
          email: "Invalid credentials",
        },
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
