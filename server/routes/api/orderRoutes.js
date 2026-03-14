import express from 'express';
import {validateBody} from "../../middleware/validator.js";
import * as orderController from "../../controller/orderController.js";
import {checkoutSchema} from "../../validator/orderSchema.js";

const orderRoutes = express.Router();


orderRoutes.get('/my', orderController.getOrders);
orderRoutes.post('/checkout', validateBody(checkoutSchema), orderController.checkout);


export default orderRoutes;