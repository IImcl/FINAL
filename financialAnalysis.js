// financialAnalysis.js

// Data Fields
const financialRecords = {
    salesIncome: 0,
    purchaseExpenses: 0,
    taxRate: 0.1 // 10% tax rate
};

// Functionalities

// Calculate Income from Sales
export function calculateIncome(salesRecords) {
    financialRecords.salesIncome = salesRecords.reduce((total, sale) => total + sale.totalPrice, 0);
    console.log(`Total Income from Sales: ${financialRecords.salesIncome}`);
    return financialRecords.salesIncome;
}

// Calculate Expenses from Purchases
export function calculateExpenses(purchaseRecords) {
    financialRecords.purchaseExpenses = purchaseRecords.reduce((total, purchase) => total + purchase.totalCost, 0);
    console.log(`Total Expenses from Purchases: ${financialRecords.purchaseExpenses}`);
    return financialRecords.purchaseExpenses;
}

// Calculate Taxes
export function calculateTaxes() {
    const taxes = financialRecords.salesIncome * financialRecords.taxRate;
    console.log(`Taxes Applied: ${taxes}`);
    return taxes;
}

// Calculate Net Profit
export function calculateNetProfit() {
    const taxes = calculateTaxes();
    const netProfit = financialRecords.salesIncome - financialRecords.purchaseExpenses - taxes;
    console.log(`Net Profit: ${netProfit}`);
    return netProfit;
}

// Generate Financial Report
export function generateFinancialReport(salesRecords, purchaseRecords) {
    calculateIncome(salesRecords);
    calculateExpenses(purchaseRecords);
    const taxes = calculateTaxes();
    const netProfit = calculateNetProfit();

    const report = {
        income: financialRecords.salesIncome,
        expenses: financialRecords.purchaseExpenses,
        taxes,
        netProfit
    };

    console.log('Financial Report:', report);
    return report;
}
