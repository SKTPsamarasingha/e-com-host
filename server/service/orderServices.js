import {logger} from "../utils/logger.js";
import Cart from "../models/cart.js";
import {BadRequestError, InternalServerError, NotFoundError} from "../middleware/appError.js";
import {v4 as uuidv4} from "uuid";
import Order from "../models/order.js";
import User from "../models/users.js";
import {sendMail} from "./emailService.js";


export const getOrders = async (userID) => {
    try {
        const orders = await Order.find({user: userID}).lean()
        if (!orders) throw new NotFoundError("Order not found");
        // console.log("getOrders", userID)

        return orders
    } catch (error) {
        logger.error({error: error.message}, "Failed to retrieve orders");
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new InternalServerError("Failed to retrieve orders");
    }
}

export const checkout = async (userID, shippingData, payment) => {
    try {
        const cart = await Cart.findOne({user: userID})
            .populate("items.product", "name price")
            .lean();


        if (!cart) throw new NotFoundError("Cart not found");
        if (!cart.items || cart.items.length === 0) throw new BadRequestError("Cart is empty");

        let totalPrice = 0

        const orderItems = cart.items.map((item) => {
            totalPrice += item.product.price * item.quantity
            return {
                itemID: item._id,
                product: item.product._id,
                size: item.size,
                quantity: item.quantity,
                price: item.product.price
            }
        })

        const orderData = {
            user: userID, items: orderItems, shippingAddress: shippingData, payment: {
                method: payment.method, status: payment.method === "CARD" ? "PAID" : "PENDING",
            }, totalPrice: totalPrice

        }

        const newOrder = await Order.create(orderData)
        if (!newOrder) throw new InternalServerError("Order not placed");
        await Cart.deleteOne({user: userID});

        try {
            const user = await User.findById(userID).select("email").lean();
            await sendMail(user.email, "Order Confirmation", "Your order has been placed successfully");
        } catch (emailErr) {
            logger.warn({emailErr}, "Order created but email failed");
        }


        return newOrder

    } catch (error) {
        logger.error({error:error.message}, "Failed to create the order ");
        if (error instanceof NotFoundError || error instanceof BadRequestError) {
            throw error;
        }
        throw new InternalServerError("Failed to create order");
    }
}