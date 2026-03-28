import { pgTable, text, serial, integer, numeric, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 12, scale: 2 }),
  discountPercent: integer("discount_percent"),
  categoryId: integer("category_id").notNull(),
  brandId: integer("brand_id").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  images: jsonb("images").$type<string[]>().default([]).notNull(),
  rating: numeric("rating", { precision: 3, scale: 1 }).default("0").notNull(),
  reviewCount: integer("review_count").default(0).notNull(),
  inStock: boolean("in_stock").default(true).notNull(),
  stockQuantity: integer("stock_quantity").default(0).notNull(),
  featured: boolean("featured").default(false).notNull(),
  isNew: boolean("is_new").default(false).notNull(),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  specifications: jsonb("specifications").$type<Array<{ group: string; key: string; value: string }>>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, createdAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
