import { Router } from "express";
import { adminLogin, adminSignup, getAllAdmins } from "../controller/admin-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
const adminRoutes = Router();
adminRoutes.get("/", getAllAdmins);
adminRoutes.post("/signup", validate(signupValidator), adminSignup);
adminRoutes.post("/login", validate(loginValidator), adminLogin);
export default adminRoutes;
//# sourceMappingURL=admin-routes.js.map