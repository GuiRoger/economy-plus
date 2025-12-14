import * as SQLite from "expo-sqlite";
import { runMigrations } from "./migrations";

export const db = SQLite.openDatabaseSync("finance.db");

export function initDb() {
  db.execSync(`PRAGMA journal_mode = WAL;`);
  db.execSync(`PRAGMA foreign_keys = ON;`);

  runMigrations(db);
}
