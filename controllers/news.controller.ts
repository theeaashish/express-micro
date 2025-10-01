import type { Request, Response } from "express";
import { newsSchema } from "../validations/newsValidation.ts";
import vine, { errors } from "@vinejs/vine";
import type fileUpload from "express-fileupload";
import { generateRandomNum, imageValidator } from "../utils/helper.ts";
import { prisma } from "../config/db.config.ts";
class NewsController {
  static async index(req: Request, res: Response) {}

  static async store(req: Request, res: Response) {
    try {
      const user = req.user;
      const body = req.body;
      const validator = vine.compile(newsSchema);

      const payload = await validator.validate(body);

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          errors: {
            image: "Image is required",
          },
        });
      }

      const image = req.files.image as fileUpload.UploadedFile;

      // validate image
      const message = imageValidator(image?.size, image?.mimetype);

      if (message !== null) {
        return res.status(400).json({
          errors: {
            image: message,
          },
        });
      }

      // image upload
      const imgExt = image?.name.split(".");
      const imgName = generateRandomNum() + "." + imgExt[1];
      const uploadPath = process.cwd() + "/public/images/" + imgName;

      image.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      // store news in db
      const news = await prisma.news.create({
        data: {
          ...payload,
          image: imgName,
          usersId: user?.id,
        },
      });

      return res.json({
        status: 200,
        message: "News created successfully",
        news,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({
          errors: error.messages,
        });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  static async show(req: Request, res: Response) {}

  static async update(req: Request, res: Response) {}

  static async destroy(req: Request, res: Response) {}
}

export default NewsController;
