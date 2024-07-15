import { Router } from "express";
import { adminLogin, adminSignup, getAllAdmins, userLogout } from "../controller/admin-controller.js";
const adminRoutes = Router();
adminRoutes.get("/", getAllAdmins);
adminRoutes.post("/signup", adminSignup);
adminRoutes.post("/login", adminLogin);
adminRoutes.get("/logout", userLogout);
export default adminRoutes;
//# sourceMappingURL=admin-routes.js.map