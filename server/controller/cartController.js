import * as cartService from '../service/cartServices.js';
import {AuthenticationError, BadRequestError} from "../middleware/appError.js";
import {log} from "debug";
import RESPONSE from "../utils/customResponse.js";

export const addCartItems = async (req, res, next) => {
    try {
        const {items: newItems} = req.validatedBody
        const userID = req.user
        if (!userID) throw new AuthenticationError('User is not authenticated', {getCartItems: "UserID required"});
        if (!newItems) throw new BadRequestError("Cart items is not found", {items: newItems})
        const result = await cartService.addCartItems(userID, newItems);
        const {_id, items} = result
        return RESPONSE.created("Products added successfully!", {_id, items}).send(res);
    } catch (error) {
        next(error)

    }
}
export const getCartItems = async (req, res, next) => {
    try {
        const userID = req.user
        if (!userID) throw new AuthenticationError('User is not authenticated', {getCartItems: "UserID required"});
        const result = await cartService.getCartItems(userID);

        if (!result || result.items.length === 0) {
            return RESPONSE.success("No products found in cart", {items: []}).send(res);
        }
        const {_id, items} = result
        return RESPONSE.success("Products retrieve successfully!", {_id, items}).send(res);

    } catch (error) {
        next(error)
    }
}
export const updateCartItems = async (req, res, next) => {
    try {
        const {itemID} = req.validatedParams;
        const {quantity} = req.validatedBody;

        console.log("updateCartItems", quantity)
        const userID = req.user
        if (!userID) throw new AuthenticationError('User is not authenticated', {getCartItems: "UserID required"});

        const result = await cartService.updateCartItems(userID, itemID, quantity);
        const {_id, items} = result
        return RESPONSE.success("Products updated successfully!", {_id, items}).send(res);


    } catch (error) {
        next(error)

    }
}
export const deleteCartItems = async (req, res, next) => {
    try {
        const {itemID} = req.validatedParams;
        const userID = req.user
        if (!userID) throw new AuthenticationError('User is not authenticated', {deleteItem: "UserID required"});

        const result = await cartService.deleteCartItems(userID, itemID);
        const {_id, items} = result

        return RESPONSE.success("Products deleted successfully!", {_id, items}).send(res);

    } catch (error) {
        next(error)

    }
}

export const clearCart = async (req, res, next) => {
    try {
        const userID = req.user
        if (!userID) throw new AuthenticationError('User is not authenticated', {deleteItem: "UserID required"});

        const result = await cartService.clearCart(userID);
        if (!result) {
            return RESPONSE.success("Cart is already empty", {items: []}).send(res);
        }
        const {_id, items} = result

        return RESPONSE.success("Cart cleared successfully!", {_id, items}).send(res);
    } catch (error) {
        next(error)

    }
}