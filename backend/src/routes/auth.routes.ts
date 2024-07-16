import { Router } from "express";
import authController from "../controllers/authController";
import path from "path";

const router = Router();

//views
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'index.html'));
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'register.html'));
});

router.get("/login-admin", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'admin.html'));
});

router.get("/register-admin", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'createAdmin.html'));
});

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.createUser);


export default router;