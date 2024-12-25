// comprehensiveReport.js

// Comprehensive Report Generation
export function generateComprehensiveReport(salesRecords, purchaseRecords, inventory) {
    const totalIncome = salesRecords.reduce((sum, sale) => sum + sale.totalPrice, 0);
    const totalExpenses = purchaseRecords.reduce((sum, purchase) => sum + purchase.totalCost, 0);
    const taxRate = 0.1;
    const taxApplied = totalIncome * taxRate;
    const netProfit = totalIncome - totalExpenses - taxApplied;

    const productsSoldPerCategory = salesRecords.reduce((report, sale) => {
        if (!report[sale.categoryName]) {
            report[sale.categoryName] = 0;
        }
        report[sale.categoryName] += sale.quantity;
        return report;
    }, {});

    const remainingStockPerCategory = inventory.reduce((report, item) => {
        report[item.category] = item.quantityAvailable;
        return report;
    }, {});

    const report = {
        totalIncome,
        totalExpenses,
        taxApplied,
        netProfit,
        productsSoldPerCategory,
        remainingStockPerCategory
    };

    console.log('Comprehensive Report:', report);
    return report;
}

// Event Listener for Generating Report
document.getElementById('generate-comprehensive-report-button').addEventListener('click', () => {
    const salesRecords = []; // Replace with actual sales data
    const purchaseRecords = []; // Replace with actual purchase data
    const inventory = []; // Replace with actual inventory data

    const report = generateComprehensiveReport(salesRecords, purchaseRecords, inventory);

    // Display the report
    document.getElementById('report-output').innerText = JSON.stringify(report, null, 2);
});
