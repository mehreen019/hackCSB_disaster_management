import { Authority } from "../models/authority.js";
import { Admin } from "../models/admin.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { ShelterList } from "../models/Shelters.js";
export const getAllAuthority = async (req, res, next) => {
    try {
        const authority = await Authority.find();
        console.log("Function called");
        return res.status(200).json({ message: "ok", authority });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error" });
    }
};
export const authoritySignup = async (req, res, next) => {
    console.log("authority signup reached");
    try {
        const { username, email, password } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        const existingAuthority = await Authority.findOne({ email });
        if (existingAdmin || existingAuthority)
            return res.status(401).send(" Already registered");
        const hashedPassword = await hash(password, 10);
        const authority = new Authority({
            username: username,
            email: email,
            password: hashedPassword,
            role: 'authority'
        });
        await authority.save();
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        const token = createToken(authority._id.toString(), authority.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires,
            httpOnly: true,
            signed: true,
        });
        console.log("Function called");
        return res.status(200).json({ message: "ok", role: authority.role });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error" });
    }
};
export const authorityLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body;
        const authority = await Authority.findOne({ email });
        if (!authority) {
            return res.status(401).send("Authority not registered");
        }
        const isPasswordCorrect = await compare(password, authority.password);
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
        const token = createToken(authority._id.toString(), authority.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "OK", name: authority.username, email: authority.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        //user token check
        const user = await Authority.findById(res.locals.jwtData.id);
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
export const saveShelters = async (req, res, next) => {
    const { locationArray } = req.body;
    try {
        console.log("reached save shelter in backend");
        console.log(locationArray);
        const shelterId = "one";
        const prevShelterList = await ShelterList.findOne({ id: shelterId });
        if (!prevShelterList) {
            const newShelterList = new ShelterList({ id: "one", shelters: locationArray });
            await newShelterList.save();
            return res.status(200).json({ message: "Shelters saved successfully! " });
        }
        else {
            prevShelterList.shelters = locationArray;
            await prevShelterList.save();
            //return res.status(200).json({ chats: user.chats });
            return res.status(200).json({ message: "Shelters saved successfully! " });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong " });
    }
};
export const getShelters = async (req, res, next) => {
    try {
        console.log("reached get shelter in backend");
        const shelterId = "one";
        const prevShelterList = await ShelterList.findOne({ id: shelterId });
        if (!prevShelterList) {
            return res.status(401).send("No schema registered OR Token malfunctioned");
        }
        console.log(prevShelterList.shelters);
        return res
            .status(200)
            .json({ message: "OK", shelters: prevShelterList.shelters });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Couldn't fetch data " });
    }
};
//# sourceMappingURL=authority-controller.js.map