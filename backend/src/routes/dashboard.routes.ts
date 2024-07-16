import { Router } from "express";
import dashboardController from "../controllers/dashboardController";
import path from "path";

const router = Router();

router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'dashboard.ejs'));
});

router.get("/dashboard", dashboardController.getDashboard);

export default router;