import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { brandsTable } from "@workspace/db/schema";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/brands", async (req, res) => {
  try {
    const brands = await db.select().from(brandsTable);
    const withCounts = await Promise.all(
      brands.map(async (brand) => {
        const countResult = await db.execute(
          sql`SELECT COUNT(*) as count FROM products WHERE brand_id = ${brand.id}`
        );
        const productCount = Number((countResult.rows[0] as any)?.count ?? 0);
        return {
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          logoUrl: brand.logoUrl,
          description: brand.description,
          country: brand.country,
          featured: brand.featured,
          productCount,
        };
      })
    );
    res.json(withCounts);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch brands");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
