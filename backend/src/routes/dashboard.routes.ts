import { Router } from "express";
import dashboardController from "../controllers/dashboardController";

const router = Router();

router.get("/dashboard", dashboardController.getDashboard);

export default router;