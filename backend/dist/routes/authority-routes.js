import { Router } from "express";
import { saveShelters, getShelters } from "../controller/authority-controller.js";
const authorityRoutes = Router();
//authorityRoutes.post("/save-dashboard", verifyToken, saveDashboardData);
authorityRoutes.post("/shelters/save", saveShelters);
authorityRoutes.get("/shelters/get", getShelters);
export default authorityRoutes;
//# sourceMappingURL=authority-routes.js.map