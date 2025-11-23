import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  firstName: text("firstName"),
  lastName: text("lastName"),
});
