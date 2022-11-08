// Store
class Store {
  private static instance: Store;
  map: Map<number, string> = new Map();

  private constructor() { }

  public clean(): void {
    this.map = new Map();
  }

  public static get(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }
}

// FirstService
class FirstService {
  save(key: number, value: string): void {
    const store = Store.get();
    store.map.set(key, value);
  }
}

// SecondService
class SecondService {
  getByKey(key: number): void {
    const store = Store.get();
    console.log(store.map.get(key));
    store.clean();
    console.log(store.map.get(key));
  }
}

// Use
new FirstService().save(1, 'Start');
new SecondService().getByKey(1);
