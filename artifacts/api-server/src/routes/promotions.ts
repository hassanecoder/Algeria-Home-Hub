import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { promotionsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/promotions", async (req, res) => {
  try {
    const promotions = await db
      .select()
      .from(promotionsTable)
      .where(eq(promotionsTable.active, true));
    res.json(
      promotions.map((p) => ({
        id: p.id,
        title: p.title,
        titleAr: p.titleAr,
        description: p.description,
        discount: p.discount,
        imageUrl: p.imageUrl,
        validUntil: p.validUntil,
        categoryId: p.categoryId,
        active: p.active,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to fetch promotions");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
