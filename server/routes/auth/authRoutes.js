import express from "express";
import usersAuthRouter from "./usersAuthRoutes.js";

const authRouter = express.Router();

authRouter.use("/users", usersAuthRouter);

export default authRouter;
