import { Request, Response } from 'express';
import { CreditUser } from '../entities/CreditUser';
import { powerBiConfig } from '../config/powerbi.config';

interface TotalCreditsByStatus {
    [key: string]: number;
}

interface AverageAmountsByTerm {
    [key: number]: { totalAmount: number, count: number, averageAmount?: number };
}

const getDashboard = async (req: Request, res: Response) => {
    try {
        const credits = await CreditUser.find({
            relations: ['user', 'credit']
        });

        const totalCreditsByStatus: TotalCreditsByStatus = credits.reduce((acc, creditUser) => {
            const status = creditUser.credit.status;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as TotalCreditsByStatus);

        const averageAmountsByTerm: AverageAmountsByTerm = credits.reduce((acc, creditUser) => {
            const term = creditUser.credit.term;
            if (!acc[term]) {
                acc[term] = { totalAmount: 0, count: 0 };
            }
            acc[term].totalAmount += parseFloat(creditUser.credit.amount.toString());
            acc[term].count += 1;
            return acc;
        }, {} as AverageAmountsByTerm);

        Object.keys(averageAmountsByTerm).forEach(term => {
            averageAmountsByTerm[+term].averageAmount = averageAmountsByTerm[+term].totalAmount / averageAmountsByTerm[+term].count;
        });

        res.render('dashboard', { 
            totalCreditsByStatus,
            averageAmountsByTerm,
            powerBiConfig
        });

        /*res.status(200).json({
            success: true,
            data: { totalCreditsByStatus,
                averageAmountsByTerm,
            }
        });*/
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default {
    getDashboard
};