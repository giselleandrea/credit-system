import express from "express";

const router = express.Router();

router.get('/test', (req, res)  => {
    console.log('Holiiii')
    res.send('Hi!!')
});

export default router;

import authRoutes from './auth.routes';

export {
    authRoutes
}