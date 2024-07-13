import { Router } from "express";
import adminRoutes from "./admin-routes.js";
import authorityRoutes from "./authority-routes.js";


const appRouter = Router();
appRouter.use("/admin_user",adminRoutes);
appRouter.use("/authority_user",authorityRoutes);

export default appRouter;