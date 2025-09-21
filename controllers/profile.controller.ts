import type { Request, Response } from "express";
import { generateRandomNum, imageValidator } from "../utils/helper.ts";
import type fileUpload from "express-fileupload";
import { prisma } from "../config/db.config.ts";

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

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(400)
          .json({ status: 400, message: "Profile image is required" });
      }

      const profile = req.files.profile as fileUpload.UploadedFile;

      // if (!profile) {
      //   return res
      //     .status(400)
      //     .json({ status: 400, message: "Profile image is required" });
      // }

      // validate image
      const message = imageValidator(
        profile?.size as number,
        profile?.mimetype as string
      );

      if (message !== null) {
        return res.status(400).json({
          errors: { profile: message },
        });
      }

      const imgExt = profile?.name.split(".");
      const imgName = generateRandomNum() + "." + imgExt[1];
      const uploadPath = process.cwd() + "/public/images/" + imgName;

      profile.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      // update profile in db
      await prisma.users.update({
        where: {
          id: Number(id),
        },
        data: {
          profile: imgName,
        },
      });

      return res.json({
        status: 200,
        message: "Profile updated successfully",
        profile: imgName,
      });
    } catch (error) {
      console.log("This error is ", error);
      return res.status(500).json({ message: "Something went wrong", error });
    }
  }
  static async destroy() {}
}

export default ProfileController;
