import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const listTable = pgTable('list', {
  symbol: varchar({ length: 20 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  exchange: varchar({ length: 255 }).notNull(),
  assetType: varchar({ length: 255 }).notNull(),
  trending: boolean(),
});
