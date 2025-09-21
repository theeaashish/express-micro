import { Router } from "express";
import AuthController from "../controllers/auth.controller.ts";
import ProfileController from "../controllers/profile.controller.ts";
import authMiddleware from "../middlewares/authenticate.ts";

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// profile routes
router.get("/profile", authMiddleware, ProfileController.index);
router.put("/profile/:id", authMiddleware, ProfileController.update);

export default router;
