import RESPONSE from "../utils/customResponse.js";
import * as userService from "../service/userServices.js";
import {BadRequestError, InternalServerError, AuthorizationError, AuthenticationError} from "../middleware/appError.js";
import {clearRefreshTokenCookie, setRefreshToken} from "../utils/jwt.js";
import User from "../models/users.js";


export const register = async (req, res, next) => {
    try {
        const userData = req.validatedBody;
        if (!userData) throw new BadRequestError("User register data not found")

        const {user, accessToken, refreshToken} = await userService.register(userData);
        const setToken = await setRefreshToken(res, refreshToken)

        if (!setToken) throw new InternalServerError("Failed to set refresh ")
        return RESPONSE.created("Registration successful!", {
            user, accessToken
        }).send(res);
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const userData = req.validatedBody

        if (!userData) throw new BadRequestError("User login data not found")

        const {accessToken, refreshToken, user} = await userService.userLogin(userData)
        const setToken = await setRefreshToken(res, refreshToken)

        if (!setToken) throw new InternalServerError("Failed to set refresh ")

        RESPONSE.success("Login completed successfully", {user, accessToken}).send(res)
    } catch (err) {
        next(err)
    }
}

export const getAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new AuthenticationError("Refresh Token is not found")

        const {newAccessToken, newRefreshToken} = await userService.getAccessToken(refreshToken)
        let clear, set
        if (newRefreshToken) {
            clear = await clearRefreshTokenCookie(res)
            set = await setRefreshToken(res, newRefreshToken)
        }

        if (!set || !clear) throw new InternalServerError("Failed to clear and set refresh")
        RESPONSE.success("Access token generated successfully", {accessToken: newAccessToken}).send(res)

    } catch (err) {
        next(err)
    }
}
export const logout = async (req, res, next) => {
    try {
        const clear = await clearRefreshTokenCookie(res)
        if (!clear) throw new InternalServerError("Failed to clear and set refresh")
        RESPONSE.success("User logout successfully",).send(res)

    } catch (err) {
        next(err)
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        const userID = req.user
        if (!userID) throw new AuthenticationError("User no longer authorize")
        const user = await userService.getUserInfo(userID)
        if (user) return RESPONSE.success("User found successfully", user).send(res);

    } catch (err) {
        next(err)
    }
}


