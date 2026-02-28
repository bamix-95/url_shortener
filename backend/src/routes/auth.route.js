import { Router } from "express";
import {
  getCurrentUserController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/me", authMiddleware, getCurrentUserController);

export default authRouter;
