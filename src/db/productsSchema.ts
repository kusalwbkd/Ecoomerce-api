import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

// Define your products table schema
export const productsTable = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

// Create a TypeScript type for the product insert schema

// Create and use the schema with the correct type
export const createProductSchema = createInsertSchema(productsTable);

export const updateProductSchema = createInsertSchema(productsTable).partial();
