import { mongoDataSource } from "../config/database";
import { Credit } from "../entities/Credit";
import { Plan } from "../entities/Plan";

interface CreditData {
    monthlyIncome: number, 
    amount: number, 
    term: number,
}

export async function evaluateCreditStatus ({
    monthlyIncome,
    amount,
    term,
}: CreditData ): Promise<string> {
    try {

        const status = monthlyIncome > amount / term ? 'Approved' : 'Rejected';
        return status;
        
    } catch (error) {
        console.error("Error al evaluar crédito");
        throw error; 
    }
};

export async function saveAmortizationPlan(credit: Credit) {
    const amortizationPlan = calculateAmortizationPlan(credit);

    const plans = amortizationPlan.map(plan => {
        const newPlan = new Plan();
        newPlan.creditId = credit.id;
        newPlan.month = plan.month;
        newPlan.principal = plan.principal;
        newPlan.interest = plan.interest;
        newPlan.remainingBalance = plan.remainingBalance;
        return newPlan;
    });

    await mongoDataSource.getMongoRepository(Plan).save(plans);
};

function calculateAmortizationPlan(credit: Credit) {
    const amortizationPlan = [];
    const monthlyInterestRate = credit.interestRate / 100 / 12;
    const monthlyPayment = credit.amount * monthlyInterestRate / (1 - Math.pow(1 / (1 + monthlyInterestRate), credit.term));
    let remainingBalance = credit.amount;

    for (let month = 1; month <= credit.term; month++) {
        const interest = remainingBalance * monthlyInterestRate;
        const principal = monthlyPayment - interest;
        remainingBalance -= principal;

        amortizationPlan.push({
            month,
            principal,
            interest,
            remainingBalance
        });
    }
    return amortizationPlan;
}