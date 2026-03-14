import {BadRequestError, AuthorizationError} from "../middleware/appError.js";
import {ACCESS_EXPIRES, ACCESS_SECRET, NODE_ENV, REFRESH_EXPIRES, REFRESH_SECRET} from "../config/envConfigs.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const ACCESS_EXPIRES_IN = Number(ACCESS_EXPIRES) || 900;
const REFRESH_EXPIRES_IN = Number(REFRESH_EXPIRES) || 2592000;

const generateHash = () => {
    return crypto.randomBytes(16).toString('hex')
}

export const generateAccessToken = async (userID) => {
    if (!userID) throw new BadRequestError("failed to generate access token", {payload: "userdata is null"});
    const accessJti = await generateHash()

    const payload = {
        sub: userID.toString(), lat: Math.floor(Date.now() / 1000), jti: accessJti, type: "access",
    };

    return jwt.sign(payload, ACCESS_SECRET, {expiresIn: ACCESS_EXPIRES_IN})
}

export const generateRefreshToken = async (userID) => {
    if (!userID) throw new BadRequestError("failed to generate refresh token", {payload: "userdata is null"});

    const refreshJti = await generateHash();
    const sid = await generateHash();

    const payload = {
        sub: userID.toString(), iat: Math.floor(Date.now() / 1000), jti: refreshJti, sid: sid, type: "refresh",
    }

    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: REFRESH_EXPIRES_IN});

}

export const verifyAccessToken = async (token) => {
    if (!token) {
        throw new AuthorizationError("Missing access token");
    }
    let decoded
    try {
        decoded = jwt.verify(token, ACCESS_SECRET);
    } catch (error) {
        throw new AuthorizationError("Invalid or expired token");
    }

    if (decoded.type !== "access") throw new AuthorizationError("Invalid token type");
    const {sub: userID} = decoded;
    return userID;
}

export const verifyRefreshToken = async (token) => {
    if (!token) {
        throw new AuthorizationError("Missing refresh token");
    }
    let decoded
    try {
        decoded = jwt.verify(token, REFRESH_SECRET)

    } catch (error) {
        throw new AuthorizationError("Invalid or expired token");
    }

    if (decoded.type !== "refresh") throw new AuthorizationError("Invalid token type");
    const {sub: userID} = decoded;
    return userID
}

export const setRefreshToken = async (res, token) => {
    if (!res || !token) return false
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: REFRESH_EXPIRES_IN * 1000,
        domain: 'localhost',
        path: '/e-com/auth'
    });
    return true
}

export const clearRefreshTokenCookie = async (res) => {
    if (!res) return false;
    res.clearCookie("refreshToken", {
        httpOnly: true, secure: NODE_ENV === "production", sameSite: "strict", domain: 'localhost', path: '/e-com/auth'
        ,
    });
    return true;
}