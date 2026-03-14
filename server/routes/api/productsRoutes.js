import express from 'express';
import * as productSchema from '../../validator/productSchema.js';
import * as productController from '../../controller/productsController.js';
import {validateQuery} from "../../middleware/validator.js";

const productsRouter = express.Router();

productsRouter.get("/all", productController.getAll);

productsRouter.get("/filter", validateQuery(productSchema.productQuerySchema), productController.getProducts);

export default productsRouter;