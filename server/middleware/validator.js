import {InternalServerError, ValidationError} from "./appError.js";
import mongoSanitize from "express-mongo-sanitize";

const validateBody = (schema) => async (req, res, next) => {
    try {
        req.validatedBody = await validateData(req.body, schema, req);
        next();
    } catch (error) {
        next(error);
    }
}

const validateParams = (schema) => async (req, res, next) => {
    try {
        req.validatedParams = await validateData(req.params, schema, req);
        next();
    } catch (error) {
        next(error);
    }
}

const validateQuery = (schema) => async (req, res, next) => {
    try {
        req.validatedQuery = await validateData(req.query, schema, req);
        next();
    } catch (error) {
        next(error);
    }
}


const validateData = async (data, schema, req) => {
    if (!data || !schema) {
        throw new InternalServerError("Validation middleware misconfigured");
    }
    const sanitizeData = mongoSanitize.sanitize(data, {
        allowDots: false, replaceWith: '_'
    })

    const {value, error} = schema.validate(sanitizeData, {abortEarly: false, stripUnknown: true, convert: true});

    if (error) {
        const errors = {};
        error.details.forEach((detail) => {
            const field = detail.path[0];
            errors[field] = detail.message;
        });
        throw new ValidationError("Input validation", errors);
    }

    return value;
}


export {validateBody, validateParams, validateQuery};