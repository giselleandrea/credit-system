import { Request, Response } from 'express';
import { User } from '../entities/User';
import { environment } from '../config/environment';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const createUser = async (req: Request, res: Response) => {
    try {
        const { 
            name, 
            email,
            password, 
            document,
            typeDocumet,
        } = req.body;

        const existingUser = await User.findOne({ 
            where: { email: email } 
        });
        if (existingUser) {
            return res.status(400).json({ message: 'El Email ya está en registrado' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User();
        newUser.name = name;
        newUser.password = hashedPassword;
        newUser.document = document;
        newUser.email = email;
        newUser.typeDocumet = typeDocumet;
        await newUser.save();
    
        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { 
            email, 
            password 
        } = req.body;

        const user = await User.findOne({ 
            where: { email: email } 
        });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
    
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ userId: user.id }, environment.jwtSecret, { expiresIn: '3h' });
    
        //console.log(token);
        res.json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export default {
    login,
    createUser,
};