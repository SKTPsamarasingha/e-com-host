import express from "express";
import * as userController from "../../controller/userController.js";

const userRoutes = express.Router();
userRoutes.get('/me', userController.getUserInfo)

export default userRoutes;