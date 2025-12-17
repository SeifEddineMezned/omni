// Local Storage Service with offline capabilities
class StorageService {
  constructor() {
    this.prefix = 'life_management_';
    this.version = '1.0';
    this.init();
  }

  init() {
    // Check if localStorage is available
    if (typeof Storage === 'undefined') {
      console.warn('localStorage is not available');
      return;
    }

    // Check for version updates
    const storedVersion = this.get('app_version');
    if (storedVersion !== this.version) {
      this.migrateData(storedVersion, this.version);
      this.set('app_version', this.version);
    }
  }

  // Core storage methods
  set(key, value) {
    try {
      const serializedValue = JSON.stringify({
        value,
        timestamp: Date.now(),
        version: this.version
      });
      localStorage.setItem(this.prefix + key, serializedValue);
      return true;
    } catch (error) {
      console.error('Error storing data:', error);
      return false;
    }
  }

  get(key, defaultValue = null) {
    try {
      const stored = localStorage.getItem(this.prefix + key);
      if (!stored) return defaultValue;

      const parsed = JSON.parse(stored);
      return parsed.value !== undefined ? parsed.value : defaultValue;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return defaultValue;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  clear() {
    try {
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(this.prefix)
      );
      keys.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  // Advanced methods
  setWithExpiry(key, value, expiryMinutes = 60) {
    const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
    return this.set(key, { value, expiry: expiryTime });
  }

  getWithExpiry(key, defaultValue = null) {
    const stored = this.get(key);
    if (!stored || !stored.expiry) {
      return stored || defaultValue;
    }

    if (Date.now() > stored.expiry) {
      this.remove(key);
      return defaultValue;
    }

    return stored.value;
  }

  // Data management methods
  getTasks() {
    return this.get('tasks', []);
  }

  setTasks(tasks) {
    return this.set('tasks', tasks);
  }

  addTask(task) {
    const tasks = this.getTasks();
    const newTask = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...task
    };
    tasks.push(newTask);
    this.setTasks(tasks);
    return newTask;
  }

  updateTask(id, updates) {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
      this.setTasks(tasks);
      return tasks[index];
    }
    return null;
  }

  deleteTask(id) {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    this.setTasks(filteredTasks);
    return true;
  }

  // Similar methods for other data types
  getHabits() {
    return this.get('habits', []);
  }

  setHabits(habits) {
    return this.set('habits', habits);
  }

  getGoals() {
    return this.get('goals', []);
  }

  setGoals(goals) {
    return this.set('goals', goals);
  }

  getFinanceData() {
    return this.get('finance', {
      transactions: [],
      budgets: [],
      categories: []
    });
  }

  setFinanceData(data) {
    return this.set('finance', data);
  }

  getHealthData() {
    return this.get('health', {
      metrics: [],
      workouts: [],
      nutrition: []
    });
  }

  setHealthData(data) {
    return this.set('health', data);
  }

  // Backup and restore
  exportData() {
    const data = {};
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(this.prefix)
    );
    
    keys.forEach(key => {
      const cleanKey = key.replace(this.prefix, '');
      data[cleanKey] = this.get(cleanKey);
    });

    return {
      version: this.version,
      exportDate: new Date().toISOString(),
      data
    };
  }

  importData(importData) {
    try {
      if (!importData.data) {
        throw new Error('Invalid import data format');
      }

      Object.keys(importData.data).forEach(key => {
        this.set(key, importData.data[key]);
      });

      return { success: true, message: 'Data imported successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Sync status for offline handling
  setSyncStatus(key, status) {
    const syncData = this.get('sync_status', {});
    syncData[key] = {
      status, // 'synced', 'pending', 'error'
      lastSync: new Date().toISOString()
    };
    this.set('sync_status', syncData);
  }

  getSyncStatus(key) {
    const syncData = this.get('sync_status', {});
    return syncData[key] || { status: 'pending', lastSync: null };
  }

  // Data migration for version updates
  migrateData(oldVersion, newVersion) {
    console.log(`Migrating data from ${oldVersion} to ${newVersion}`);
    
    // Add migration logic here when needed
    // For example:
    // if (oldVersion === '0.9' && newVersion === '1.0') {
    //   // Migrate specific data structures
    // }
  }

  // Utility methods
  getStorageInfo() {
    let totalSize = 0;
    let itemCount = 0;
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        totalSize += localStorage.getItem(key).length;
        itemCount++;
      }
    });

    return {
      totalSize: totalSize,
      itemCount: itemCount,
      availableSpace: 5 * 1024 * 1024 - totalSize, // Assuming 5MB limit
      version: this.version
    };
  }

  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}

// Create singleton instance
const storageService = new StorageService();

export default storageService;

// Hook for React components
export const useStorage = () => {
  return {
    set: storageService.set.bind(storageService),
    get: storageService.get.bind(storageService),
    remove: storageService.remove.bind(storageService),
    clear: storageService.clear.bind(storageService),
    setWithExpiry: storageService.setWithExpiry.bind(storageService),
    getWithExpiry: storageService.getWithExpiry.bind(storageService),
    exportData: storageService.exportData.bind(storageService),
    importData: storageService.importData.bind(storageService),
    getStorageInfo: storageService.getStorageInfo.bind(storageService),
  };
};
