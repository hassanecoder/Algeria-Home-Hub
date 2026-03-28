import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { reviewsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/reviews", async (req, res) => {
  try {
    const productId = Number(req.query.productId);
    if (!productId) {
      res.status(400).json({ error: "productId is required" });
      return;
    }
    const reviews = await db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.productId, productId))
      .orderBy(reviewsTable.createdAt);
    res.json(reviews);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch reviews");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
