import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
} from "drizzle-orm/sqlite-core";

// ---------------------------------------------------------------------------
// NextAuth required tables — match the Drizzle adapter's expected schema
// ---------------------------------------------------------------------------

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp" }),
  image: text("image"),
  // App-specific columns
  role: text("role", {
    enum: ["trader", "developer", "institutional", "validator", "researcher"],
  }).default("trader"),
  passwordHash: text("password_hash"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const accounts = sqliteTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => [primaryKey({ columns: [table.provider, table.providerAccountId] })]
);

export const sessions = sqliteTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })]
);

// ---------------------------------------------------------------------------
// App-specific tables
// ---------------------------------------------------------------------------

export const contentVerifications = sqliteTable("content_verifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  contentId: text("content_id").notNull(),
  contentType: text("content_type", {
    enum: ["blog", "glossary", "learn", "analysis"],
  }).notNull(),
  status: text("status", {
    enum: ["ai-generated", "human-verified", "editors-pick"],
  }).notNull(),
  verifiedBy: text("verified_by").references(() => users.id, {
    onDelete: "set null",
  }),
  verifiedAt: integer("verified_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  confidenceScore: real("confidence_score"),
  notes: text("notes"),
});

export const userPreferences = sqliteTable("user_preferences", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  layoutMode: text("layout_mode", {
    enum: ["dashboard", "feed", "compact"],
  }).default("dashboard"),
  favoriteTokens: text("favorite_tokens", { mode: "json" })
    .$type<string[]>()
    .default([]),
  favoriteValidators: text("favorite_validators", { mode: "json" })
    .$type<string[]>()
    .default([]),
  theme: text("theme").default("dark"),
  notifications: integer("notifications", { mode: "boolean" }).default(true),
});

export const publishedContent = sqliteTable("published_content", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type", {
    enum: ["blog", "glossary", "learn", "analysis"],
  }).notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: text("category"),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  status: text("status", {
    enum: ["draft", "published", "archived"],
  })
    .notNull()
    .default("draft"),
  verificationStatus: text("verification_status", {
    enum: ["ai-generated", "human-verified", "editors-pick"],
  }).default("ai-generated"),
  aiModel: text("ai_model"),
  aiGeneratedAt: integer("ai_generated_at", { mode: "timestamp" }),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  views: integer("views").default(0),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  authorId: text("author_id").references(() => users.id, {
    onDelete: "set null",
  }),
});
