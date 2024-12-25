// inventoryManagement.js

// Data Fields
const inventory = [
    { id: 1, category: 'Small', quantityAvailable: 0, reorderLevel: 50, restockDate: null, storageLocation: 'A1', pricePerKg: 10 },
    { id: 2, category: 'Medium', quantityAvailable: 0, reorderLevel: 30, restockDate: null, storageLocation: 'A2', pricePerKg: 9 },
    { id: 3, category: 'Large', quantityAvailable: 0, reorderLevel: 20, restockDate: null, storageLocation: 'B1', pricePerKg: 8 },
    { id: 4, category: 'Extra Large', quantityAvailable: 0, reorderLevel: 10, restockDate: null, storageLocation: 'B2', pricePerKg: 7 },
    { id: 5, category: 'Family Pack', quantityAvailable: 0, reorderLevel: 5, restockDate: null, storageLocation: 'C1', pricePerKg: 6 },
    { id: 6, category: 'Bulk Pack', quantityAvailable: 0, reorderLevel: 2, restockDate: null, storageLocation: 'C2', pricePerKg: 5 },
    { id: 7, category: 'Premium', quantityAvailable: 0, reorderLevel: 1, restockDate: null, storageLocation: 'C3', pricePerKg: 15 }
];

// Functionalities

// Real-Time Tracking
export function updateStockLevels(categoryName, change) {
    const item = inventory.find(i => i.category === categoryName);
    if (!item) {
        console.error('Category not found. Cannot update stock levels.');
        return;
    }
    item.quantityAvailable += change;
    console.log(`Stock Updated for '${categoryName}': New Quantity = ${item.quantityAvailable}`);
}

export function viewStockLevels() {
    console.log('Current Stock Levels:', inventory);
    return inventory;
}

// Demand Forecasting
export function forecastDemand(salesRecords, timeframe) {
    const predictions = inventory.map(item => {
        const totalSold = salesRecords
            .filter(sale => sale.categoryName === item.category && sale.date >= timeframe.start && sale.date <= timeframe.end)
            .reduce((sum, sale) => sum + sale.quantity, 0);

        return {
            category: item.category,
            projectedDemand: totalSold,
            adjustmentRecommendation: item.quantityAvailable - totalSold < item.reorderLevel
                ? 'Increase Stock'
                : 'Stock is Sufficient'
        };
    });

    console.log('Demand Forecasting:', predictions);
    return predictions;
}

// Pricing Functions
export function updatePricing(categoryName, newPrice) {
    const item = inventory.find(i => i.category === categoryName);
    if (!item) {
        console.error('Category not found. Cannot update pricing.');
        return;
    }
    item.pricePerKg = newPrice;
    console.log(`Pricing Updated for '${categoryName}': New Price per Kg = ${item.pricePerKg}`);
}

export function calculateCost(categoryName, quantity) {
    const item = inventory.find(i => i.category === categoryName);
    if (!item) {
        console.error('Category not found. Cannot calculate cost.');
        return 0;
    }
    const totalCost = (item.pricePerKg * quantity) / 1000; // Assuming weight in grams
    console.log(`Cost Calculated for '${categoryName}': Quantity = ${quantity}g, Total Cost = ${totalCost}`);
    return totalCost;
}

// Alerts and Notifications
export function stockAlerts() {
    inventory.forEach(item => {
        if (item.quantityAvailable < item.reorderLevel) {
            console.warn(`Low Stock Alert: '${item.category}' is below reorder level. Current Quantity: ${item.quantityAvailable}`);
            alert(`Reorder needed for '${item.category}'. Current Stock: ${item.quantityAvailable}`);
        }
    });
}

export function restockReminders() {
    const today = new Date();
    inventory.forEach(item => {
        if (item.restockDate && new Date(item.restockDate) <= today) {
            console.log(`Restock Reminder: '${item.category}' needs restocking. Scheduled Date: ${item.restockDate}`);
            alert(`Restock Reminder: '${item.category}' was scheduled for today or earlier.`);
        }
    });
}

// Generate Inventory Report
export function generateInventoryReport(timeframe = 'daily') {
    let filteredInventory = inventory;

    if (timeframe === 'daily') {
        const today = new Date().toISOString().split('T')[0];
        filteredInventory = inventory.filter(item => item.restockDate === today);
    } else if (timeframe === 'weekly') {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);
        filteredInventory = inventory.filter(item => new Date(item.restockDate) >= weekStart);
    } else if (timeframe === 'monthly') {
        const monthStart = new Date();
        monthStart.setMonth(monthStart.getMonth() - 1);
        filteredInventory = inventory.filter(item => new Date(item.restockDate) >= monthStart);
    }

    const report = filteredInventory.map(item => ({
        id: item.id,
        category: item.category,
        quantityAvailable: item.quantityAvailable,
        reorderLevel: item.reorderLevel,
        restockDate: item.restockDate,
        storageLocation: item.storageLocation,
        pricePerKg: item.pricePerKg
    }));

    console.log(`Inventory Report (${timeframe}):`, report);
    return report;
}

// Analyze Turnover Rates
export function analyzeTurnoverRates(salesRecords) {
    const turnoverRates = inventory.map(item => {
        const totalSold = salesRecords
            .filter(sale => sale.categoryName === item.category)
            .reduce((sum, sale) => sum + sale.quantity, 0);

        return {
            category: item.category,
            turnoverRate: totalSold / item.quantityAvailable
        };
    });

    console.log('Turnover Rates:', turnoverRates);
    return turnoverRates;
}

// Integration with Purchase Records
export function integrateWithPurchaseRecords(purchaseRecords) {
    purchaseRecords.forEach(purchase => {
        const category = inventory.find(item => item.category === purchase.category);
        if (category) {
            updateStockLevels(category.category, purchase.quantity);
        }
    });
    console.log('Inventory updated with purchase records.');
}

// Integration with Supplier Management
export function connectToSupplierManagement(supplierID) {
    console.log(`Connecting to Supplier Management for Supplier ID: ${supplierID}`);
    alert(`Supplier Management Module is now connected for Supplier ID: ${supplierID}`);
}
