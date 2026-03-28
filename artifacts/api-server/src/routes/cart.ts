import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

declare module "express-session" {
  interface SessionData {
    cart: Record<string, number>;
  }
}

const FREE_DELIVERY_THRESHOLD = 5000;
const DELIVERY_FEE = 350;

async function buildCartResponse(session: any) {
  const cartData: Record<string, number> = session.cart ?? {};
  const productIds = Object.keys(cartData).map(Number).filter((id) => cartData[String(id)] > 0);

  if (productIds.length === 0) {
    return { items: [], subtotal: 0, deliveryFee: 0, total: 0, itemCount: 0 };
  }

  const products = await db.select().from(productsTable).where(
    eq(productsTable.id, productIds[0])
  );
  const allProducts = await Promise.all(
    productIds.map((id) => db.select().from(productsTable).where(eq(productsTable.id, id)))
  );
  const productMap = Object.fromEntries(allProducts.flatMap((p) => p.map((prod) => [prod.id, prod])));

  const items = productIds
    .filter((id) => productMap[id])
    .map((id) => {
      const product = productMap[id];
      const qty = cartData[String(id)];
      const price = Number(product.price);
      return {
        productId: id,
        productName: product.name,
        brandName: "",
        imageUrl: product.imageUrl,
        price,
        quantity: qty,
        subtotal: price * qty,
      };
    });

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, subtotal, deliveryFee, total, itemCount };
}

router.get("/cart", async (req, res) => {
  try {
    const session = req as any;
    if (!session.session) session.session = {};
    if (!session.session.cart) session.session.cart = {};
    const cart = await buildCartResponse(session.session);
    res.json(cart);
  } catch (err) {
    req.log.error({ err }, "Failed to get cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/cart", async (req, res) => {
  try {
    const session = req as any;
    if (!session.session) session.session = {};
    if (!session.session.cart) session.session.cart = {};
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      res.status(400).json({ error: "productId and quantity required" });
      return;
    }
    const key = String(productId);
    session.session.cart[key] = (session.session.cart[key] ?? 0) + quantity;
    if (session.session.cart[key] <= 0) delete session.session.cart[key];
    const cart = await buildCartResponse(session.session);
    res.json(cart);
  } catch (err) {
    req.log.error({ err }, "Failed to add to cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/cart/:productId", async (req, res) => {
  try {
    const session = req as any;
    if (!session.session) session.session = {};
    if (!session.session.cart) session.session.cart = {};
    const productId = String(req.params.productId);
    const { quantity } = req.body;
    if (quantity <= 0) {
      delete session.session.cart[productId];
    } else {
      session.session.cart[productId] = quantity;
    }
    const cart = await buildCartResponse(session.session);
    res.json(cart);
  } catch (err) {
    req.log.error({ err }, "Failed to update cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/cart/:productId", async (req, res) => {
  try {
    const session = req as any;
    if (!session.session) session.session = {};
    if (!session.session.cart) session.session.cart = {};
    delete session.session.cart[String(req.params.productId)];
    const cart = await buildCartResponse(session.session);
    res.json(cart);
  } catch (err) {
    req.log.error({ err }, "Failed to remove from cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/cart", async (req, res) => {
  try {
    const session = req as any;
    if (!session.session) session.session = {};
    session.session.cart = {};
    res.json({ message: "Cart cleared" });
  } catch (err) {
    req.log.error({ err }, "Failed to clear cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
