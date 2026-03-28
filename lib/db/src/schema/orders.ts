import { pgTable, text, serial, numeric, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  status: text("status").notNull().default("pending"),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  wilaya: text("wilaya").notNull(),
  commune: text("commune").notNull(),
  address: text("address").notNull(),
  paymentMethod: text("payment_method").notNull(),
  items: jsonb("items").$type<Array<{ productId: number; quantity: number; price: number; name: string }>>().default([]).notNull(),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull(),
  deliveryFee: numeric("delivery_fee", { precision: 12, scale: 2 }).notNull().default("350"),
  total: numeric("total", { precision: 12, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
