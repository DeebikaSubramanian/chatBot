import { Router } from "express";
import { getAllUsers, loginUsers, postAllUsers, UserLogOut, verifyUser } from "../controllers/userControllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/tokenManager.js";

const userRoutes=Router()

userRoutes.get("/",getAllUsers)
userRoutes.post("/signup",validate (signupValidator ), postAllUsers);
userRoutes.post("/login",validate (loginValidator ), loginUsers);
userRoutes.get("/authStatus",verifyToken, verifyUser);
userRoutes.get("/logout",verifyToken, UserLogOut);
export default userRoutes;