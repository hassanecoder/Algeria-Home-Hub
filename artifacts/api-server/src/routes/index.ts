import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import brandsRouter from "./brands";
import promotionsRouter from "./promotions";
import cartRouter from "./cart";
import wishlistRouter from "./wishlist";
import ordersRouter from "./orders";
import reviewsRouter from "./reviews";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(categoriesRouter);
router.use(brandsRouter);
router.use(promotionsRouter);
router.use(cartRouter);
router.use(wishlistRouter);
router.use(ordersRouter);
router.use(reviewsRouter);

export default router;
