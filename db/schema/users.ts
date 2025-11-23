import { relations } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { account } from "./account";
import { session } from "./session";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  firstName: text("firstName"),
  lastName: text("lastName"),
  deletedAt: timestamp("deletedAt"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
}));
