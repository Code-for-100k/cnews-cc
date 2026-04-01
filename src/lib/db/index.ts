import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import * as schema from "./schema";

const DATA_DIR = join(process.cwd(), "data");
const DB_PATH = join(DATA_DIR, "cnews.db");

let _db: BetterSQLite3Database<typeof schema> | null = null;
let _initialized = false;

export function getDb(): BetterSQLite3Database<typeof schema> {
  if (_db) return _db;

  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  const sqlite = new Database(DB_PATH);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  sqlite.pragma("busy_timeout = 10000");

  _db = drizzle(sqlite, { schema });

  if (!_initialized) {
    _initialized = true;
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        emailVerified INTEGER,
        image TEXT,
        role TEXT DEFAULT 'trader',
        password_hash TEXT,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS accounts (
        userId TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        providerAccountId TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        PRIMARY KEY (provider, providerAccountId)
      );

      CREATE TABLE IF NOT EXISTS sessions (
        sessionToken TEXT PRIMARY KEY,
        userId TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS verification_tokens (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires INTEGER NOT NULL,
        PRIMARY KEY (identifier, token)
      );

      CREATE TABLE IF NOT EXISTS content_verifications (
        id TEXT PRIMARY KEY,
        content_id TEXT NOT NULL,
        content_type TEXT NOT NULL,
        status TEXT NOT NULL,
        verified_by TEXT REFERENCES users(id) ON DELETE SET NULL,
        verified_at INTEGER,
        confidence_score REAL,
        notes TEXT
      );

      CREATE TABLE IF NOT EXISTS user_preferences (
        user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        layout_mode TEXT DEFAULT 'dashboard',
        favorite_tokens TEXT DEFAULT '[]',
        favorite_validators TEXT DEFAULT '[]',
        theme TEXT DEFAULT 'dark',
        notifications INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS published_content (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        type TEXT NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        category TEXT,
        tags TEXT DEFAULT '[]',
        status TEXT NOT NULL DEFAULT 'draft',
        verification_status TEXT DEFAULT 'ai-generated',
        ai_model TEXT,
        ai_generated_at INTEGER,
        published_at INTEGER,
        views INTEGER DEFAULT 0,
        seo_title TEXT,
        seo_description TEXT,
        author_id TEXT REFERENCES users(id) ON DELETE SET NULL
      );

      CREATE INDEX IF NOT EXISTS idx_content_verifications_content
        ON content_verifications(content_id, content_type);

      CREATE INDEX IF NOT EXISTS idx_published_content_slug
        ON published_content(slug);

      CREATE INDEX IF NOT EXISTS idx_published_content_status
        ON published_content(status, type);
    `);
  }

  return _db;
}

// Convenience export — call getDb() in hot paths that need the real instance
export const db = new Proxy({} as BetterSQLite3Database<typeof schema>, {
  get(_target, prop, receiver) {
    const realDb = getDb();
    const value = Reflect.get(realDb, prop, receiver);
    if (typeof value === "function") {
      return value.bind(realDb);
    }
    return value;
  },
});
