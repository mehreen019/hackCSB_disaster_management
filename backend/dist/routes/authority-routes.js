import { Router } from "express";
import { saveShelters, getShelters } from "../controller/authority-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { authorityLogin, authoritySignup, getAllAuthority } from "../controller/authority-controller.js";
const authorityRoutes = Router();
authorityRoutes.get("/", getAllAuthority);
authorityRoutes.post("/signup", validate(signupValidator), authoritySignup);
authorityRoutes.post("/login", validate(loginValidator), authorityLogin);
//authorityRoutes.post("/save-dashboard", verifyToken, saveDashboardData);
authorityRoutes.post("/shelters/save", saveShelters);
authorityRoutes.get("/shelters/get", getShelters);
export default authorityRoutes;
//# sourceMappingURL=authority-routes.js.map