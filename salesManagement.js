import { DataManager } from './supplier.js';

// Use DataManager for persistent data
const salesManager = new DataManager('sales');
const productCategories = [
    { id: 1, name: 'Small', weight: 100, pricePerKg: 50, stockLevel: 0, restockThreshold: 50 },
    { id: 2, name: 'Medium', weight: 250, pricePerKg: 48, stockLevel: 0, restockThreshold: 30 },
    { id: 3, name: 'Large', weight: 500, pricePerKg: 45, stockLevel: 0, restockThreshold: 20 },
    { id: 4, name: 'Extra Large', weight: 1000, pricePerKg: 42, stockLevel: 0, restockThreshold: 10 },
    { id: 5, name: 'Family Pack', weight: 2000, pricePerKg: 40, stockLevel: 0, restockThreshold: 5 },
    { id: 6, name: 'Bulk Pack', weight: 5000, pricePerKg: 38, stockLevel: 0, restockThreshold: 2 },
    { id: 7, name: 'Premium', weight: 'custom', pricePerKg: 60, stockLevel: 0, restockThreshold: 1 }
];

export function logSale(saleID, customerName, categoryName, quantity) {
    const category = productCategories.find(cat => cat.name === categoryName);
    if (!category) {
        console.error('Category not found. Cannot log sale.');
        return;
    }
    if (category.stockLevel < quantity) {
        console.error('Insufficient stock. Sale cannot be processed.');
        alert('Insufficient stock to process the sale.');
        return;
    }
    
    const totalPrice = (quantity / 1000) * category.pricePerKg;
    const sale = { saleID, customerName, categoryName, quantity, totalPrice, date: new Date() };
    
    salesManager.add(sale);
    category.stockLevel -= quantity;

    console.log(`Sale Logged:`, sale);
    alert(`Sale successfully logged for ${customerName}. Total Price: ${totalPrice}`);
}

export function calculateTotalRevenue() {
    const sales = salesManager.data;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    console.log(`Total Revenue from All Sales: ${totalRevenue}`);
    return totalRevenue;
}

export function generateSalesReports(criteria) {
    const sales = salesManager.data;
    let report;
    
    if (criteria === 'category') {
        report = sales.reduce((acc, sale) => {
            if (!acc[sale.categoryName]) {
                acc[sale.categoryName] = { unitsSold: 0, revenue: 0 };
            }
            acc[sale.categoryName].unitsSold += sale.quantity;
            acc[sale.categoryName].revenue += sale.totalPrice;
            return acc;
        }, {});
    } else if (criteria === 'customer') {
        report = sales.reduce((acc, sale) => {
            if (!acc[sale.customerName]) {
                acc[sale.customerName] = { unitsBought: 0, revenue: 0 };
            }
            acc[sale.customerName].unitsBought += sale.quantity;
            acc[sale.customerName].revenue += sale.totalPrice;
            return acc;
        }, {});
    }

    console.log(`Sales Report by ${criteria}:`, report);
    return report;
}

// Add event listeners to connect with HTML
document.addEventListener('DOMContentLoaded', () => {
    const salesForm = document.getElementById('add-sale-form');
    if (salesForm) {
        salesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const customerName = document.getElementById('customer-name').value;
            const category = document.getElementById('sale-category').value;
            const quantity = parseFloat(document.getElementById('sale-quantity').value);
            
            logSale(Date.now(), customerName, category, quantity);
        });
    }

    const financialReportBtn = document.getElementById('generate-financial-report');
    if (financialReportBtn) {
        financialReportBtn.addEventListener('click', () => {
            const totalRevenue = calculateTotalRevenue();
            const reportOutput = document.getElementById('financial-report');
            reportOutput.innerHTML = `
                <h3>Financial Report</h3>
                <p>Total Revenue: $${totalRevenue.toFixed(2)}</p>
            `;
        });
    }
});