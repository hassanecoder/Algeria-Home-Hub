import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { ordersTable, productsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const FREE_DELIVERY_THRESHOLD = 5000;
const DELIVERY_FEE = 350;

function generateOrderNumber() {
  const now = Date.now();
  const rand = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `TMK-${now}-${rand}`;
}

router.post("/orders", async (req, res) => {
  try {
    const { customerName, phone, email, wilaya, commune, address, paymentMethod, items, notes } = req.body;
    if (!customerName || !phone || !wilaya || !commune || !address || !paymentMethod || !items?.length) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const enrichedItems = await Promise.all(
      items.map(async ({ productId, quantity }: { productId: number; quantity: number }) => {
        const [product] = await db.select().from(productsTable).where(eq(productsTable.id, productId));
        if (!product) throw new Error(`Product ${productId} not found`);
        return {
          productId,
          quantity,
          price: Number(product.price),
          name: product.name,
        };
      })
    );

    const subtotal = enrichedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    const [order] = await db.insert(ordersTable).values({
      orderNumber: generateOrderNumber(),
      status: "pending",
      customerName,
      phone,
      email: email ?? null,
      wilaya,
      commune,
      address,
      paymentMethod,
      items: enrichedItems,
      subtotal: String(subtotal),
      deliveryFee: String(deliveryFee),
      total: String(total),
      notes: notes ?? null,
    }).returning();

    res.status(201).json({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      customerName: order.customerName,
      wilaya: order.wilaya,
      total: Number(order.total),
      createdAt: order.createdAt,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
