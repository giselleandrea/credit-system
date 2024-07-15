import express from "express";

const router = express.Router();

router.get('/test', (req, res)  => {
    console.log('Holiiii')
    res.send('Hi!!')
});

export default router;

import authRoutes from './auth.routes';
import creditRoutes from './credit.routes';
import dashboardRoutes from './dashboard.routes';

export {
    authRoutes,
    creditRoutes,
    dashboardRoutes
}