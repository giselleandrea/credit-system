import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/auth/login", authController.login);
router.post("/auth/createuser", authController.createUser);


export default router;