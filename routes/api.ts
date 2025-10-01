import { Router } from "express";
import AuthController from "../controllers/auth.controller.ts";
import ProfileController from "../controllers/profile.controller.ts";
import authMiddleware from "../middlewares/authenticate.ts";
import NewsController from "../controllers/news.controller.ts";

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// profile routes
router.get("/profile", authMiddleware, ProfileController.index);
router.put("/profile/:id", authMiddleware, ProfileController.update);

// news routes
router.get("/news", authMiddleware, NewsController.index);
router.post("/news", authMiddleware, NewsController.store);
router.get("/news/:id", authMiddleware, NewsController.show);
router.put("/news/:id", authMiddleware, NewsController.update);
router.delete("/news/:id", authMiddleware, NewsController.destroy);

export default router;
