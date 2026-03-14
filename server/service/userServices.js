import User from "../models/users.js";
import {AuthenticationError, ConflictError, InternalServerError, AuthorizationError} from "../middleware/appError.js";
import {comparePassword, hashedPassword} from "../utils/bcrypt.js";
import {logger} from "../utils/logger.js";
import {generateAccessToken, generateRefreshToken, setRefreshToken, verifyRefreshToken} from "../utils/jwt.js";

export const register = async (userData) => {
    try {

        let existingUser = await User.findOne({email: userData?.email});
        if (existingUser) throw new ConflictError("User already exists");

        userData.password = await hashedPassword(userData.password);

        const result = await User.create(userData)
        const {password, __v, updatedAt, createdAt, ...user} = result.toObject();

        const accessToken = await generateAccessToken(result?._id)
        const refreshToken = await generateRefreshToken(user?._id)

        if (!result) throw new InternalServerError("Creating user failed");
        if (!accessToken || !refreshToken) throw new InternalServerError("Failed to generate tokens", {userID: "Invalid userID"})

        return {user, accessToken, refreshToken};

    } catch (error) {
        logger.error({error:error.message}, "User registration failed ");
        if (error instanceof ConflictError || error instanceof InternalServerError) throw error;
        throw new InternalServerError("User registration failed", {error: error.message});
    }
}


export const userLogin = async (userData) => {
    try {
        let result = await User.findOne({email: userData?.email}).select('_id email password name role').lean()
        if (!result) throw new AuthenticationError("Invalid email", {email: "Invalid email"});

        const {password, ...user} = result;


        const isVerified = await comparePassword(userData?.password, password);
        if (!isVerified) throw new AuthenticationError("Invalid password", {password: "Invalid password"});

        const accessToken = await generateAccessToken(user?._id)
        const refreshToken = await generateRefreshToken(user?._id)

        if (!accessToken || !refreshToken) throw new InternalServerError("Failed to generate tokens", {userID: "Invalid userID"})

        return {accessToken, refreshToken, user}

    } catch (error) {
        logger.error({error:error.message}, "User login failed ");
        if (error instanceof AuthenticationError || error instanceof InternalServerError) throw error;

        throw new InternalServerError("User login failed", {error: error.message});
    }
}

export const getAccessToken = async (token) => {
    try {
        const userID = await verifyRefreshToken(token);
        if (!userID) throw new AuthenticationError("Refresh Token is not valid")

        let user = await User.findOne({_id: userID}).select('_id').lean()
        if (!user || userID !== user._id) throw new AuthenticationError("User does not exist cannot issue new tokens");

        const newAccessToken = await generateAccessToken(userID);
        const newRefreshToken = await generateRefreshToken(userID)

        if (!newAccessToken || !newRefreshToken) throw new InternalServerError("Failed to generate tokens")

        return {newAccessToken, newRefreshToken}

    } catch (error) {
        logger.error({error:error.message}, "Issuing new access token failed");
        if (error instanceof AuthorizationError || error instanceof InternalServerError) throw error;

        throw new InternalServerError("Issuing new access token failed", {error: error.message});
    }
}

export const getUserInfo = async (userID) => {
    try {
        const user = User.findOne({_id: userID}).select('_id name email').lean()
        if (!user) throw new InternalServerError("User does not exist cannot");
        return user
    } catch (error) {
        logger.error({error:error.message}, "Getting User info failed");
        if (error instanceof InternalServerError) throw error;
        throw new InternalServerError("Getting User info failed", {error: error.message});
    }
}

