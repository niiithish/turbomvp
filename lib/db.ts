// lib/db.ts

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  account,
  accountRelations,
  session,
  sessionRelations,
  users,
  usersRelations,
} from "@/db/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// SINGLE drizzle client with your app schema including relations
export const db = drizzle(pool, {
  schema: {
    users,
    usersRelations,
    account,
    accountRelations,
    session,
    sessionRelations,
  },
});
