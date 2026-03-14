import express from 'express';
import * as userController from '../../controller/userController.js';
import * as userSchemas from "../../validator/userSchema.js";
import {validateBody, validateParams, validateQuery} from "../../middleware/validator.js";


const usersAuthRouter = express.Router();

usersAuthRouter.get('/refresh', userController.getAccessToken)

usersAuthRouter.post('/register', validateBody(userSchemas.userRegistrationSchema), userController.register)
usersAuthRouter.post('/login', validateBody(userSchemas.userLoginSchema), userController.login)
usersAuthRouter.post('/logout', userController.logout)


export default usersAuthRouter;