import {AuthorizationError} from "./appError.js";
import {WHITELIST} from "../config/envConfigs.js";
import {verifyAccessToken} from "../utils/jwt.js";

const authToken = async (req, res, next) => {
    try {
        const isWhitelisted = WHITELIST.some(route => req.originalUrl.startsWith(route.path) && req.method === route.method);
        if (isWhitelisted) return next();

        const authHeader = req.headers?.authorization;
        const token = authHeader ? authHeader.replace('Bearer ', '') : false;
        if (!token) throw new AuthorizationError("Invalid token")

        req.user = await verifyAccessToken(token);
        next()
    } catch (error) {
        next(error)
    }
}

export default authToken