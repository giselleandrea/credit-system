import { Router } from "express";
import creditController from "../controllers/creditController";

const router = Router();

router.post("/credit/assessment", creditController.creditAssessment);
router.get("/credit/credits", creditController.getCredits);

export default router;