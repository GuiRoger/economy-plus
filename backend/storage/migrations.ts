import type * as SQLite from "expo-sqlite";

type Db = SQLite.SQLiteDatabase;

export function runMigrations(db: Db) {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS _meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);

  const row = db.getFirstSync<{ value: string }>(
    `SELECT value FROM _meta WHERE key = 'schema_version'`
  );

  const current = row ? Number(row.value) : 0;

  if (current < 1) {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY NOT NULL,
        type TEXT NOT NULL,                 -- 'income' | 'expense'
        amount_cents INTEGER NOT NULL,      -- sempre centavos (int)
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,                 -- ISO (YYYY-MM-DD ou ISO completo)
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_tx_date ON transactions(date);
      CREATE INDEX IF NOT EXISTS idx_tx_type_date ON transactions(type, date);
      CREATE INDEX IF NOT EXISTS idx_tx_category_date ON transactions(category, date);

      INSERT OR REPLACE INTO _meta(key, value) VALUES ('schema_version', '1');
    `);
  }
}
