import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { categoriesTable } from "@workspace/db/schema";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await db.select().from(categoriesTable).where(sql`${categoriesTable.parentId} IS NULL`);
    const withSubcategories = await Promise.all(
      categories.map(async (cat) => {
        const subcats = await db.select().from(categoriesTable).where(sql`${categoriesTable.parentId} = ${cat.id}`);
        const countResult = await db.execute(
          sql`SELECT COUNT(*) as count FROM products WHERE category_id = ${cat.id}`
        );
        const productCount = Number((countResult.rows[0] as any)?.count ?? 0);
        return {
          id: cat.id,
          name: cat.name,
          nameAr: cat.nameAr,
          slug: cat.slug,
          description: cat.description,
          imageUrl: cat.imageUrl,
          icon: cat.icon,
          productCount,
          subcategories: subcats.map((s) => ({
            id: s.id,
            name: s.name,
            nameAr: s.nameAr,
            slug: s.slug,
            productCount: 0,
          })),
        };
      })
    );
    res.json(withSubcategories);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
