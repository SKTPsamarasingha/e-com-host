import * as orderService from "../service/orderServices.js";
import {AuthenticationError, BadRequestError} from "../middleware/appError.js";
import RESPONSE from "../utils/customResponse.js";


export const getOrders = async (req, res, next) => {
    try {
        const userID = req.user;

        if (!userID) throw new AuthenticationError('User is not authenticated');
        const result = await orderService.getOrders(userID)
        const {user, __v, ...data} = result

        return RESPONSE.success("Orders are found!", data).send(res);

    } catch (error) {
        next(error)
    }
}
export const checkout = async (req, res, next) => {
    try {
        const userID = req.user;
        const {shippingData, payment} = req.validatedBody

        if (!userID) throw new AuthenticationError('User is not authenticated');
        if (!shippingData && !payment) throw new BadRequestError("Shipping or payment information are missing")

        const result = await orderService.checkout(userID, shippingData, payment)
        const {user, __v, ...data} = result.toJSON();
        return RESPONSE.created("Order added successfully!", data).send(res);

    } catch (error) {
        next(error)
    }
}