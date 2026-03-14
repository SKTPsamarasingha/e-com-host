import express from "express";
import userApi from "./userRoutes.js";
import productsRouter from "./productsRoutes.js";
import cartRouter from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";

const apiRouter = express.Router();

apiRouter.use('/users', userApi);
apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/order', orderRoutes);

export default apiRouter;