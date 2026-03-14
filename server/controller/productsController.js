import {logger} from "../utils/logger.js";
import RESPONSE from "../utils/customResponse.js";
import * as productService from "../service/productsServices.js";
import {InternalServerError} from "../middleware/appError.js";


export const getAll = async (req, res, next) => {
    try {

        const result = await productService.getAll();
        if (!result) throw new InternalServerError("Failed to get products", result);

        return RESPONSE.success("Products retrieve successfully!", result).send(res);
    } catch (err) {
        next(err)
    }
}
export const getProducts = async (req, res, next) => {
    try {
        let data = {}
        for (const [key, value] of Object.entries(req.validatedQuery)) {
            if (value !== undefined && value !== null && !Number.isNaN(value)) {
                data[key] = value;
            }
        }

        const result = await productService.getProducts(data);
        if (!result) throw new InternalServerError("Failed to get products", result);

        return RESPONSE.success("Products retrieve successfully!", result).send(res);
    } catch (err) {
        next(err)
    }
}