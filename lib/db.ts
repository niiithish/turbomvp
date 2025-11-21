// lib/db.ts

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
// biome-ignore lint/performance/noNamespaceImport
import * as schema from "@/db/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// SINGLE drizzle client with your app schema
export const db = drizzle(pool, { schema });
