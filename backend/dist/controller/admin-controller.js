import { Admin } from "../models/admin.js";
import { hash, compare } from "bcrypt";
import { Authority } from "../models/authority.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllAdmins = async (req, res, next) => {
    try {
        const admin = await Admin.find();
        console.log("Function called");
        return res.status(200).json({ message: "ok", admin });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error" });
    }
};
export const adminSignup = async (req, res, next) => {
    try {
        console.log("landed");
        const { username, email, password } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        const existingAuthority = await Authority.findOne({ email });
        if (existingAdmin || existingAuthority)
            return res.status(401).send(" Already registered");
        const hashedPassword = await hash(password, 10);
        const admin = new Admin({
            username: username,
            email: email,
            password: hashedPassword,
            role: 'admin'
        });
        await admin.save();
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        const token = createToken(admin._id.toString(), admin.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires,
            httpOnly: true,
            signed: true,
        });
        console.log("Function called");
        return res.status(200).json({ message: "ok", role: admin.role });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error" });
    }
};
export const adminLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).send("Admin not registered");
        }
        const isPasswordCorrect = await compare(password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        const token = createToken(admin._id.toString(), admin.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "OK", name: admin.username, email: admin.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=admin-controller.js.map