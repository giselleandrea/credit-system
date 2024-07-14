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

    const paymentSchedule = amortizationPlan.map(plan => ({
        month: plan.month,
        principal: plan.principal,
        interest: plan.interest,
        remainingBalance: plan.remainingBalance,
    }));

    const newPlan = new Plan();
    newPlan.creditId = credit.id;
    newPlan.paymentSchedule = paymentSchedule;
    await mongoDataSource.getMongoRepository(Plan).save(newPlan);
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
};