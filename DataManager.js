// DataManager.js
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
      return this.data.length ? Math.max(...this.data.map(item => item.id)) + 1 : 1000;
    }
  
    findById(id) {
      return this.data.find(item => item.id === id);
    }
  
    getAllData() {
      return [...this.data];
    }
  }
  
  // Centralized data managers
  export const supplierManager = new DataManager('suppliers');
  export const productManager = new DataManager('products');
  export const salesManager = new DataManager('sales');
  export const inventoryManager = new DataManager('inventory');