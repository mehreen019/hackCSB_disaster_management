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
export const getUserByUsername = async (req, res, next) => {
    try {
        const username = req.body;
        const admin = await Admin.findOne(username);
        console.log("Function called");
        return res.status(200).json({ message: "OK", name: admin.username, email: admin.email });
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
            role: 'user'
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
        return res.status(200).json({ message: "OK", name: admin.username, email: admin.email, friends: admin.friends });
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
        return res.status(200).json({ message: "OK", name: admin.username, email: admin.email, friends: admin.friends,role:admin.role });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        //user token check
        const user = await Admin.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res
            .status(200)
            .json({ message: "OK", username: user.username, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        //user token check
        const user = await Admin.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res
            .status(200)
            .json({ message: "OK", username: user.username, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const addFriend = async (req, res, next) => {
    try {
        const { username, friendUsername } = req.body;
        // Find the admin who is adding a friend
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        // Check if the friend exists
        const friend = await Admin.findOne({ username: friendUsername });
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        // Add friend's username to admin's friends list if not already added
        if (!admin.friends.includes(friendUsername)) {
            admin.friends.push(friendUsername);
            await admin.save();
        }
        return res.status(200).json({ message: 'Friend added successfully', friends: admin.friends });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error' });
    }
};
//# sourceMappingURL=admin-controller.js.map