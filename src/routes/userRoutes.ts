import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import { userSchema } from "../schemas/User.js";

const userRoutes = Router();

userRoutes.post('/signup', validateSchema(userSchema) , userControllers.create)
userRoutes.post("/signin", userControllers.signin)

export default userRoutes;
