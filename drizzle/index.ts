import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { sessions, todos, users } from "./schema";

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(client, { schema: { users, sessions, todos } });

// Setup lucia adapter
export const luciaAdapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
