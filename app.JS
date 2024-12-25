// app.js
import { 
    supplierManager, productManager, salesManager, inventoryManager 
  } from './DataManager.js';
  
  function initSupplierManagement() {
    const supplierForm = document.getElementById('add-supplier-form');
    supplierForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const supplier = {
        name: document.getElementById('supplier-name').value,
        contact: document.getElementById('supplier-contact').value,
        location: document.getElementById('supplier-location').value
      };
      supplierManager.add(supplier);
      alert('Supplier added successfully!');
      supplierForm.reset();
    });
  }
  
  function initProductCategorization() {
    const categorizationForm = document.getElementById('categorize-product-form');
    categorizationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const product = {
        category: document.getElementById('category').value,
        quantity: parseFloat(document.getElementById('quantity').value)
      };
      productManager.add(product);
      alert('Product categorized successfully!');
      categorizationForm.reset();
    });
  }
  
  function initSalesManagement() {
    const salesForm = document.getElementById('add-sale-form');
    salesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sale = {
        customerName: document.getElementById('customer-name').value,
        customerContact: document.getElementById('customer-contact').value,
        category: document.getElementById('sale-category').value,
        quantity: parseFloat(document.getElementById('sale-quantity').value)
      };
      salesManager.add(sale);
      alert('Sale recorded successfully!');
      salesForm.reset();
    });
  
    document.getElementById('generate-financial-report').addEventListener('click', () => {
      const sales = salesManager.getAllData();
      const totalRevenue = sales.reduce((sum, sale) => 
        sum + (sale.quantity * (sale.pricePerKg || 10)), 0);
      document.getElementById('financial-report').innerHTML = `
        <h3>Financial Report</h3>
        <p>Total Revenue: $${totalRevenue.toFixed(2)}</p>
      `;
    });
  }
  
  function initInventoryManagement() {
    document.getElementById('view-inventory').addEventListener('click', () => {
      const inventory = inventoryManager.getAllData();
      const inventoryDetails = document.getElementById('inventory-details');
      inventoryDetails.innerHTML = inventory.map(item => 
        `<div><strong>${item.category || 'Unnamed'}</strong>: ${item.quantity || 0} kg (Reorder Level: ${item.reorderLevel || 'Not Set'})</div>`
      ).join('');
    });
  
    document.getElementById('generate-inventory-report').addEventListener('click', () => {
      const inventory = inventoryManager.getAllData();
      const reportOutput = document.getElementById('inventory-report-output');
      reportOutput.innerHTML = inventory.map(item => 
        `<div><h4>${item.category || 'Unnamed Category'}</h4><p>Quantity: ${item.quantity || 0} kg</p><p>Reorder Level: ${item.reorderLevel || 'Not Set'}</p></div>`
      ).join('');
    });
  }
  
  function initComprehensiveReport() {
    document.getElementById('generate-comprehensive-report').addEventListener('click', () => {
      const report = {
        suppliers: supplierManager.getAllData(),
        products: productManager.getAllData(),
        sales: salesManager.getAllData(),
        inventory: inventoryManager.getAllData()
      };
      document.getElementById('comprehensive-report-output').innerHTML = `
        <pre>${JSON.stringify(report, null, 2)}</pre>
      `;
    });
  }
  
  function populateCategories() {
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
  
  function initializeApp() {
    document.addEventListener('DOMContentLoaded', () => {
      populateCategories();
      initSupplierManagement();
      initProductCategorization();
      initSalesManagement();
      initInventoryManagement();
      initComprehensiveReport();
    });
  }
  
  initializeApp();