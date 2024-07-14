import {Router} from "express";
import { adminLogin, adminSignup, getAllAdmins } from "../controller/admin-controller.js";
//import { loginValidator, signupValidator, validate } from "../utils/validators.js";


const adminRoutes = Router();
adminRoutes.get("/",getAllAdmins);
adminRoutes.post("/signup",adminSignup);
adminRoutes.post("/login",adminLogin);
export default adminRoutes;