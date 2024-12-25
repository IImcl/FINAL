// productCategorization.js

// Data Fields
const productCategories = [
    { id: 1, name: 'Small', weight: 100, products: [], pricePerKg: 50, stockLevel: 0, restockThreshold: 50 },
    { id: 2, name: 'Medium', weight: 250, products: [], pricePerKg: 48, stockLevel: 0, restockThreshold: 30 },
    { id: 3, name: 'Large', weight: 500, products: [], pricePerKg: 45, stockLevel: 0, restockThreshold: 20 },
    { id: 4, name: 'Extra Large', weight: 1000, products: [], pricePerKg: 42, stockLevel: 0, restockThreshold: 10 },
    { id: 5, name: 'Family Pack', weight: 2000, products: [], pricePerKg: 40, stockLevel: 0, restockThreshold: 5 },
    { id: 6, name: 'Bulk Pack', weight: 5000, products: [], pricePerKg: 38, stockLevel: 0, restockThreshold: 2 },
    { id: 7, name: 'Premium', weight: 'custom', products: [], pricePerKg: 60, stockLevel: 0, restockThreshold: 1 }
];

// Functionalities

// Assign Products to Categories
export function assignProductToCategory(productID, productName, weight) {
    const category = productCategories.find(cat => cat.weight === weight || cat.name === 'Premium');
    if (!category) {
        console.error('No suitable category found for this weight.');
        return;
    }
    const product = { id: productID, name: productName, weight };
    category.products.push(product);
    category.stockLevel += weight;
    console.log(`Product Assigned:`, product, `to Category:`, category.name);
    alert(`Product '${productName}' assigned to category '${category.name}' successfully!`);
}

// Ensure Proper Categorization
export function validateProductCategorization(productID) {
    for (const category of productCategories) {
        const product = category.products.find(p => p.id === productID);
        if (product) {
            console.log(`Product '${product.name}' is correctly categorized in '${category.name}'.`);
            return category;
        }
    }
    console.error('Product is not categorized correctly or does not exist.');
    return null;
}

// Track Products by Category
export function trackProductsByCategory() {
    const categoryDetails = productCategories.map(category => ({
        name: category.name,
        productCount: category.products.length,
        stockLevel: category.stockLevel,
        products: category.products
    }));
    console.log('Category Tracking Details:', categoryDetails);
    return categoryDetails;
}

// Monitor Stock Levels
export function monitorStockLevels() {
    productCategories.forEach(category => {
        if (category.stockLevel < category.restockThreshold) {
            console.warn(`Low Stock Alert for '${category.name}': Current Stock = ${category.stockLevel}, Threshold = ${category.restockThreshold}`);
            alert(`Restock Alert: '${category.name}' is below the threshold. Current Stock: ${category.stockLevel}`);
        }
    });
}

// Generate Inventory Report
export function generateInventoryReport() {
    const inventoryReport = productCategories.map(category => ({
        name: category.name,
        stockLevel: category.stockLevel,
        restockThreshold: category.restockThreshold,
        products: category.products
    }));
    console.log('Inventory Report:', inventoryReport);
    return inventoryReport;
}
