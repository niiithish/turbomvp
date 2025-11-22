import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  firstName: text("firstName"),
  lastName: text("lastName"),
  timezone: text("timezone").default("utc"),
  language: text("language").default("en"),
  use24Hour: boolean("use24Hour").default(true),
});


