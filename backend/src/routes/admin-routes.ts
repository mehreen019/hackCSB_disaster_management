import {Router} from "express";
import { adminLogin, adminSignup, getAllAdmins, userLogout,getUserByUsername,addFriend } from "../controller/admin-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const adminRoutes = Router();
adminRoutes.get("/",getAllAdmins);
adminRoutes.post("/signup",adminSignup);
adminRoutes.post("/login",adminLogin);
adminRoutes.get("/logout", userLogout );
adminRoutes.post("/username",getUserByUsername);
adminRoutes.post("/addfriend",addFriend);
export default adminRoutes;