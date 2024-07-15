import { Router } from "express";
import creditController from "../controllers/creditController";
import path from "path";
import { authMiddleware } from "../middleware/authenticateToken";

const router = Router();

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'home.html'));
});

router.get("/home-admin", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'homeAdmin.html'));
});

router.post("/credit/assessment", authMiddleware, creditController.creditAssessment);
router.get("/credit/credits", authMiddleware, creditController.getCredits);
router.put('/credits/cancel/:credit_id', authMiddleware, creditController.cancelCredit); 
router.get("/credit/credituser", authMiddleware, creditController.getCreditUser);

export default router;