import {Router} from "express";

import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { authorityLogin, authoritySignup , getAllAuthority} from "../controller/authority-controller.js";


const authorityRoutes = Router();
authorityRoutes.get("/",getAllAuthority);
authorityRoutes.post("/signup",validate(signupValidator),authoritySignup);
authorityRoutes.post("/login",validate(loginValidator),authorityLogin);
export default authorityRoutes;