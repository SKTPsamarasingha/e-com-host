import {logger} from "../utils/logger.js";
import {InternalServerError} from "../middleware/appError.js";
import Product from "../models/products.js";


export const getAll = async () => {
    try {
        return await Product.find().lean();
    } catch (error) {
        logger.error({error: error.message}, "Products retrieving failed");
        throw new InternalServerError("Products retrieving failed", {
            error: error.message,
        });
    }
};


export const getProducts = async (filters) => {
    try {
        const {name, description, category, size, minPrice, maxPrice, page = 1, limit = 10} = filters;
        const query = {};
        if (name || description) {
            query.$or = [];
            if (name) query.$or.push({name: {$regex: name, $options: "i"}});
            if (description) query.$or.push({description: {$regex: description, $options: "i"}});
        }

        if (category) {
            query.category = category;
        }

        if (size) {
            query.sizes = {$in: [size]};
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};
            if (minPrice !== undefined) query.price.$gte = Number(minPrice);
            if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
        }
        const skip = (page - 1) * limit;
        const products = await Product.find(query)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(query);

        return {
            products, total, page: Number(page), totalPages: Math.ceil(total / limit)
        };
    } catch (error) {
        logger.error({error: error.message}, "Products retrieving failed");
        throw new InternalServerError("Products retrieving failed", {err: err.message});
    }
}