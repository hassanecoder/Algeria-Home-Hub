import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable, brandsTable, categoriesTable } from "@workspace/db/schema";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/wishlist", async (req, res) => {
  try {
    const session = req as any;
    if (!session.session) session.session = {};
    const wishlist: number[] = session.session.wishlist ?? [];
    if (wishlist.length === 0) {
      res.json([]);
      return;
    }
    const products = await Promise.all(
      wishlist.map((id) => db.select().from(productsTable).where(eq(productsTable.id, id)))
    );
    const flat = products.flat();
    const result = await Promise.all(
      flat.map(async (p) => {
        const [cat] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, p.categoryId));
        const [brand] = await db.select().from(brandsTable).where(eq(brandsTable.id, p.brandId));
        return {
          id: p.id,
          name: p.name,
          nameAr: p.nameAr,
          slug: p.slug,
          description: p.description,
          price: Number(p.price),
          originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
          discountPercent: p.discountPercent,
          categoryId: p.categoryId,
          categoryName: cat?.name ?? "",
          brandId: p.brandId,
          brandName: brand?.name ?? "",
          imageUrl: p.imageUrl,
          images: p.images ?? [],
          rating: Number(p.rating),
          reviewCount: p.reviewCount,
          inStock: p.inStock,
          stockQuantity: p.stockQuantity,
          featured: p.featured,
          isNew: p.isNew,
          tags: p.tags ?? [],
          createdAt: p.createdAt,
        };
      })
    );
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to get wishlist");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/wishlist", async (req, res) => {
  try {
    const session = req as any;
    if (!session.session) session.session = {};
    if (!session.session.wishlist) session.session.wishlist = [];
    const { productId } = req.body;
    if (!productId) {
      res.status(400).json({ error: "productId required" });
      return;
    }
    if (!session.session.wishlist.includes(productId)) {
      session.session.wishlist.push(productId);
    }
    res.json({ message: "Added to wishlist" });
  } catch (err) {
    req.log.error({ err }, "Failed to add to wishlist");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/wishlist/:productId", async (req, res) => {
  try {
    const session = req as any;
    if (!session.session) session.session = {};
    if (!session.session.wishlist) session.session.wishlist = [];
    const productId = Number(req.params.productId);
    session.session.wishlist = session.session.wishlist.filter((id: number) => id !== productId);
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    req.log.error({ err }, "Failed to remove from wishlist");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
