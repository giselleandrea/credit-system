import { Request, Response } from 'express';
import { Credit } from '../entities/Credit';
import { CreditUser } from '../entities/CreditUser';
import { evaluateCreditStatus, 
    saveAmortizationPlan 
} from '../services/creditService';

const creditAssessment = async (req: Request, res: Response) => {
    try {
        const {
            name,
            amount,
            term,            
            monthlyIncome,
        } = req.body;

        const userId = (req as any).userId;
        const interestRate = 2;

        const creditStatus = await evaluateCreditStatus({
            monthlyIncome,
            amount,
            term,
        }); 

        const newCredit = new Credit();
        newCredit.name = name;
        newCredit.amount = amount;
        newCredit.term = term;
        newCredit.interestRate = interestRate;
        newCredit.monthlyIncome = monthlyIncome;
        newCredit.status = creditStatus;
        await newCredit.save();

        const newCreditUser = new CreditUser();
        newCreditUser.credit = newCredit;
        newCreditUser.user = userId;
        await newCreditUser.save();

        if (creditStatus === 'Approved') {
            await saveAmortizationPlan(newCredit);
        }

        console.log("Created successfully");
        res.status(201).json({ 
            success: true,
            message: 'Crédito creado correctamente', 
            data: newCredit      
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getCredits = async (req: Request, res: Response) => {
    try {
        const allCredits = await CreditUser.find({
            relations: ['user', 'credit']
        });

        if (allCredits.length === 0 ) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron Creditos en la BD',
            });
        }

        const data = allCredits.map((credit) => ({
            usuario: {
                id: credit.user.id,
                name: credit.user.name,
                email: credit.user.email,
                document: credit.user.document,
                typeDocument: credit.user.typeDocumet,
            },
            credito: {
                id: credit.credit.id,
                name: credit.credit.name,
                amount: credit.credit.amount,
                term: credit.credit.term,
                interestRate: credit.credit.interestRate,
                monthlyIncome: credit.credit.monthlyIncome,
                status: credit.credit.status,
                created_at: credit.credit.created_at,
            }
        }));

        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getCreditUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        const allCredits = await CreditUser.find({
            where: { user: { id: userId } },
            relations: ['user', 'credit']
        });

        if (allCredits.length === 0 ) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron Creditos en la BD',
            });
        }

        const data = allCredits.map((credit) => ({
            usuario: {
                id: credit.user.id,
                name: credit.user.name,
                email: credit.user.email,
                document: credit.user.document,
                typeDocument: credit.user.typeDocumet,
            },
            credito: {
                id: credit.credit.id,
                name: credit.credit.name,
                amount: credit.credit.amount,
                term: credit.credit.term,
                interestRate: credit.credit.interestRate,
                monthlyIncome: credit.credit.monthlyIncome,
                status: credit.credit.status,
                created_at: credit.credit.created_at,
            }
        }));

        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const cancelCredit = async (req: Request, res: Response) => {
    try {
        const credit_id = parseInt(req.params.credit_id);

        const credit = await Credit.findOne({
            where: {id: credit_id},
        });
        if (!credit) {
            return res.status(404).json({
                success: false,
                message: 'Crédito no encontrado',
            });
        }

        credit.status = 'cancelled';
        await credit.save();

        res.status(200).json({
            success: true,
            message: 'Estado del crédito actualizado a cancelado',
            data: credit,
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export default {
    creditAssessment,
    getCredits,
    cancelCredit,
    getCreditUser
};