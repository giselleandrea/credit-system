import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { environment } from '../config/environment';

interface DecodedToken {
    userId: string;
    iat: number;
    exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Access denied');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied');
    }

    try {
        const decoded = jwt.verify(token, environment.jwtSecret) as DecodedToken;
        (req as any).userId = decoded.userId;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};
