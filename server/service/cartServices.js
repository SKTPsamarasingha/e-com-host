import Cart from "../models/cart.js";
import {logger} from "../utils/logger.js";
import {ConflictError, InternalServerError, NotFoundError} from "../middleware/appError.js";

export const addCartItems = async (userID, cartData) => {
    try {
        if (!Array.isArray(cartData)) cartData = [cartData];
        let cart = await Cart.findOne({user: userID})
        if (!cart) {
            cart = await Cart.create({
                user: userID, items: cartData,
            });
        } else {
            cartData.forEach((newItem) => {
                const existingItem = cart.items.find(item => item.product.toString() === newItem.product.toString() && item.size === newItem.size);
                if (existingItem) {
                    existingItem.quantity += newItem.quantity;
                } else {
                    cart.items.push(newItem);
                }
            })

            await cart.save();
        }
        const updatedCart = await Cart.findById(cart._id)
            .populate("items.product", "name price imageUrl category")
            .lean();
        if (!updatedCart) throw new NotFoundError("Cart not found");
        console.log(updatedCart)
        return updatedCart

    } catch (error) {
        logger.error({error: error.message}, "Adding to cart has failed");
        if (error instanceof ConflictError || error instanceof InternalServerError) throw error;
        throw new InternalServerError("Adding to cart has failed", {error: error.message});
    }
}


export const getCartItems = async (userID) => {
    try {
        const cart = await Cart.findOne({user: userID})
            .populate("items.product", "name price imageUrl category")
            .lean();
        if (!cart) throw new NotFoundError("Cart not found");
        return cart || null;
    } catch (error) {
        logger.error({error: error.message}, "Failed to fetch cart items");
        if (error instanceof NotFoundError) throw error;
        throw new InternalServerError("Could not retrieve cart");
    }
};

export const updateCartItems = async (userID, itemID, quantity) => {
    try {
        const cart = await Cart.findOne({user: userID});
        if (!cart) throw new NotFoundError("Cart not found");

        const item = cart.items.find((i) => i._id.toString() === itemID)
        if (!item) throw new NotFoundError("Item not found in cart");
        item.quantity = quantity

        await cart.save()
        return cart

    } catch (error) {
        logger.error({error: error.message}, "Failed to update the cart");
        if (error instanceof NotFoundError) throw error;
        throw new InternalServerError("Could not retrieve cart");
    }
}

export const deleteCartItems = async (userID, itemID) => {
    try {
        const cart = await Cart.findOneAndUpdate({user: userID}, {$pull: {items: {_id: itemID}}}, {new: true});
        if (!cart) throw new NotFoundError("Cart not found");

        return cart

    } catch (error) {
        logger.error({error: error.message}, "Failed to delete the cart item");
        if (error instanceof NotFoundError) throw error;
        throw new InternalServerError("Could not retrieve cart");
    }
}

export const clearCart = async (userID) => {
    try {
        const cart = await Cart.findOneAndDelete({user: userID}).exec();

        if (!cart) {
            throw new NotFoundError("Cart not found or already empty");
        }

        return cart;
    } catch (error) {
        logger.error({error: error.message}, "Failed to clear cart");
        if (error instanceof NotFoundError) throw error;
        throw new InternalServerError("Could not retrieve cart");
    }
}