// Database
class Database {
  private readonly db: Map<string, string> = new Map();
  save(key: string, value: string): void {
    this.db.set(key, value);
  }
}

// PersistentDatabase
class PersistentDatabase {
  savePersistent(data: Object): void {
    console.log(data);
  }
}

// PersistentDatabaseAdapter
class PersistentDatabaseAdapter extends Database {
  constructor(public database: PersistentDatabase) {
    super();
  }

  override save(key: string, value: string): void {
    this.database.savePersistent({ key, value });
  }
}

// run
function run(db: Database): void {
  db.save('name', 'John');
}

// Use
run(new PersistentDatabaseAdapter(new PersistentDatabase()));
