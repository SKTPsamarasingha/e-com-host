import {NODE_ENV} from "../config/envConfigs.js";
import {AppError} from "./appError.js";
import {logger} from "../utils/logger.js";
import {v4 as uuidv4} from 'uuid';

const errorHandler = (error, req, res, next) => {
    const isDev = NODE_ENV === 'development';

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            statusCode: error.statusCode,
            message: error.message,
            type: error.name,     // Explicitly show the error class name
            errors: error.details, // Put the specific details here
            meta: error.meta
        });
    }

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message: isDev ? error.message : 'Internal server error',
        errors: isDev ? error.stack : null, // Show stack trace only in dev
        meta: {
            timestamp: new Date().toISOString(),
            apiVersion: process.env.API_VERSION || '1.0.0',
        }
    });
    next()
}
const requestHandler = (req, res, next) => {
    req.requestId = uuidv4();
    logger.info(
        {
            requestId: req.requestId,
            method: req.method,
            path: req.originalUrl,
            ip: req.ip,
        },
        "Incoming request"
    );

    next();
}

export {errorHandler, requestHandler};