import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const promotionsTable = pgTable("promotions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleAr: text("title_ar").notNull(),
  description: text("description").notNull().default(""),
  discount: text("discount").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  validUntil: timestamp("valid_until").notNull(),
  categoryId: integer("category_id"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPromotionSchema = createInsertSchema(promotionsTable).omit({ id: true, createdAt: true });
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;
export type Promotion = typeof promotionsTable.$inferSelect;
