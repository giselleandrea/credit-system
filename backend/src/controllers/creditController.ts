import { Request, Response } from 'express';
import { Credit } from '../entities/Credit';
import { CreditUser } from '../entities/CreditUser';

const createCredit = async (req: Request, res: Response) => {
    try {
        const {
            name,
            amount,
            term,
            interestRate,
            monthlyIncome,
            userId,
        } = req.body;

        const newCredit = new Credit();
        newCredit.name = name;
        newCredit.amount = amount;
        newCredit.term = term;
        newCredit.interestRate = interestRate;
        newCredit.monthlyIncome = monthlyIncome;
        newCredit.status = 'revision';
        await newCredit.save();

        const newCreditUser = new CreditUser();
        newCreditUser.credit = newCredit;
        newCreditUser.user = userId;
        await newCreditUser.save();

        console.log("Created successfully");
        res.status(201).json({ 
            success: true,
            message: 'Credito creado correctamente', 
            data: newCredit      
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default {
    createCredit
};