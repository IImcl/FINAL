// DataManager Class with Comprehensive Functionality
export class DataManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.data = this.loadData();
    }

    loadData() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            return savedData ? JSON.parse(savedData) : [];
        } catch (error) {
            console.error(`Error loading ${this.storageKey} data:`, error);
            return [];
        }
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (error) {
            console.error(`Error saving ${this.storageKey} data:`, error);
        }
    }

    add(item) {
        item.id = this.getNextId();
        this.data.push(item);
        this.save();
        return item;
    }

    update(id, updates) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updates };
            this.save();
        }
    }

    delete(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.save();
    }

    getNextId() {
        return this.data.length 
            ? Math.max(...this.data.map(item => parseInt(item.id))) + 1 
            : 1000;
    }

    findById(id) {
        return this.data.find(item => item.id === id);
    }
}

// Existing utility function remains
const logAction = (message) => {
    console.log(`[Action]: ${message}`);
};

// Simplified Export Handlers
export function handleSupplierSubmission() {
    const supplierManager = new DataManager('suppliers');
    const supplierForm = document.getElementById('add-supplier-form');
    
    supplierForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const supplier = {
            name: document.getElementById('supplier-name').value,
            contact: document.getElementById('supplier-contact').value,
            location: document.getElementById('supplier-location').value
        };
        
        supplierManager.add(supplier);
        logAction(`Supplier Added: ${JSON.stringify(supplier)}`);
        alert('Supplier added successfully!');
        supplierForm.reset();
    });
}

export function handleProductCategorization() {
    const productManager = new DataManager('products');
    document.getElementById('categorize-product-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const product = {
            category: document.getElementById('category').value,
            quantity: parseInt(document.getElementById('quantity').value)
        };

        productManager.add(product);
        logAction(`Product Categorized: ${JSON.stringify(product)}`);
        alert('Product categorized successfully!');
        this.reset();
    });
}

export function handleSalesSubmission() {
    const salesManager = new DataManager('sales');
    document.getElementById('add-sale-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const sale = {
            customerName: document.getElementById('customer-name').value,
            customerContact: document.getElementById('customer-contact').value,
            category: document.getElementById('sale-category').value,
            quantity: parseInt(document.getElementById('sale-quantity').value)
        };

        salesManager.add(sale);
        logAction(`Sale Recorded: ${JSON.stringify(sale)}`);
        alert('Sale recorded successfully!');
        this.reset();
    });
}

export function generateComprehensiveReport() {
    const supplierManager = new DataManager('suppliers');
    const productManager = new DataManager('products');
    const salesManager = new DataManager('sales');

    document.getElementById('generate-comprehensive-report').addEventListener('click', () => {
        const report = {
            suppliers: supplierManager.data,
            products: productManager.data,
            sales: salesManager.data
        };

        logAction('Generating comprehensive report...');
        document.getElementById('comprehensive-report-output').innerHTML = `<pre>${JSON.stringify(report, null, 2)}</pre>`;
    });
}

// Fetch and Populate Categories
export function fetchCategories() {
    const categories = [
        { value: "small", label: "Small (100g)" },
        { value: "medium", label: "Medium (250g)" },
        { value: "large", label: "Large (500g)" },
        { value: "extra-large", label: "Extra Large (1kg)" },
        { value: "family", label: "Family Pack (2kg)" },
        { value: "bulk", label: "Bulk Pack (5kg)" },
        { value: "premium", label: "Premium (Custom)" }
    ];

    const categorySelects = document.querySelectorAll("select[name='category'], select[name='sale-category']");
    categorySelects.forEach(select => {
        select.innerHTML = categories.map(cat => `<option value="${cat.value}">${cat.label}</option>`).join('');
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    handleSupplierSubmission();
    handleProductCategorization();
    handleSalesSubmission();
    generateComprehensiveReport();
    fetchCategories();
});