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


