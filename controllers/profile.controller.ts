import type { Request, Response } from "express";

class ProfileController {
  static async index(req: Request, res: Response) {
    try {
      const user = req.user;

      return res.json({ status: 200, user });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  static async store() {}
  static async show() {}
  static async update() {}
  static async destroy() {}
}

export default ProfileController;
