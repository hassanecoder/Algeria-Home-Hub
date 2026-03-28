import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable, categoriesTable, brandsTable } from "@workspace/db/schema";
import { eq, and, gte, lte, ilike, sql, desc, asc, inArray } from "drizzle-orm";

const router: IRouter = Router();

function formatProduct(p: any, cat: any, brand: any) {
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
}

router.get("/products/featured", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).where(eq(productsTable.featured, true)).limit(12);
    const result = await enrichProducts(products);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch featured products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/new-arrivals", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).where(eq(productsTable.isNew, true)).orderBy(desc(productsTable.createdAt)).limit(12);
    const result = await enrichProducts(products);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch new arrivals");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/best-sellers", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).orderBy(desc(productsTable.reviewCount)).limit(12);
    const result = await enrichProducts(products);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch best sellers");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const [cat] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, product.categoryId));
    const [brand] = await db.select().from(brandsTable).where(eq(brandsTable.id, product.brandId));
    const relatedRaw = await db.select().from(productsTable)
      .where(and(eq(productsTable.categoryId, product.categoryId), sql`${productsTable.id} != ${id}`))
      .limit(6);
    const related = await enrichProducts(relatedRaw);
    res.json({
      ...formatProduct(product, cat, brand),
      specifications: product.specifications ?? [],
      relatedProducts: related,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, search, featured, onSale, inStock, sortBy, page = "1", limit = "20" } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, parseInt(limit) || 20);
    const offset = (pageNum - 1) * limitNum;

    const conditions: any[] = [];

    if (category) {
      const [cat] = await db.select().from(categoriesTable).where(eq(categoriesTable.slug, category));
      if (cat) conditions.push(eq(productsTable.categoryId, cat.id));
    }
    if (brand) {
      const [br] = await db.select().from(brandsTable).where(eq(brandsTable.slug, brand));
      if (br) conditions.push(eq(productsTable.brandId, br.id));
    }
    if (minPrice) conditions.push(gte(productsTable.price, minPrice));
    if (maxPrice) conditions.push(lte(productsTable.price, maxPrice));
    if (search) conditions.push(ilike(productsTable.name, `%${search}%`));
    if (featured === "true") conditions.push(eq(productsTable.featured, true));
    if (inStock === "true") conditions.push(eq(productsTable.inStock, true));
    if (onSale === "true") conditions.push(sql`${productsTable.discountPercent} IS NOT NULL AND ${productsTable.discountPercent} > 0`);

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    switch (sortBy) {
      case "price_asc": orderBy = asc(productsTable.price); break;
      case "price_desc": orderBy = desc(productsTable.price); break;
      case "rating": orderBy = desc(productsTable.rating); break;
      case "popular": orderBy = desc(productsTable.reviewCount); break;
      default: orderBy = desc(productsTable.createdAt);
    }

    const [products, countResult] = await Promise.all([
      db.select().from(productsTable).where(where).orderBy(orderBy).limit(limitNum).offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(productsTable).where(where),
    ]);

    const total = Number(countResult[0]?.count ?? 0);
    const enriched = await enrichProducts(products);

    res.json({
      products: enriched,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch products");
    res.status(500).json({ error: "Internal server error" });
  }
});

async function enrichProducts(products: any[]) {
  if (products.length === 0) return [];
  const catIds = [...new Set(products.map((p) => p.categoryId))] as number[];
  const brandIds = [...new Set(products.map((p) => p.brandId))] as number[];
  const [cats, brands] = await Promise.all([
    db.select().from(categoriesTable).where(inArray(categoriesTable.id, catIds)),
    db.select().from(brandsTable).where(inArray(brandsTable.id, brandIds)),
  ]);
  const catMap = Object.fromEntries(cats.map((c) => [c.id, c]));
  const brandMap = Object.fromEntries(brands.map((b) => [b.id, b]));
  return products.map((p) => formatProduct(p, catMap[p.categoryId], brandMap[p.brandId]));
}

export default router;
