import express from 'express';
import * as cartController from '../../controller/cartController.js';
import * as validator from '../../middleware/validator.js';
import * as cartSchema from "../../validator/cartSchems.js";


const cartRouter = express.Router();

cartRouter.get("/get", cartController.getCartItems);

cartRouter.post("/add", validator.validateBody(cartSchema.cartSchema), cartController.addCartItems);

cartRouter.put("/update/item/:itemID", validator.validateParams(cartSchema.itemID), validator.validateBody(cartSchema.updateCartItemSchema), cartController.updateCartItems);

cartRouter.delete("/delete/item/:itemID", validator.validateParams(cartSchema.itemID), cartController.deleteCartItems);
cartRouter.delete("/clear", cartController.clearCart);


export default cartRouter;