import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  password_hash: text("password_hash").notNull(),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const todos = pgTable("todos", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  todo: text("todo").notNull(),
  completed: boolean("completed").notNull().default(false),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});
