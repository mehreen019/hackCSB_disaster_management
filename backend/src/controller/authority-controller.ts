import { Request,Response,NextFunction } from "express";
import { Authority } from "../models/authority.js"
import { Admin } from "../models/admin.js";
import {hash,compare} from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllAuthority = async (req:Request,res:Response,next:NextFunction) =>
{
    try {
        const authority = await Authority.find();
        console.log("Function called");
        return res.status(200).json({message:"ok",authority });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error" });
    }
}
export const authoritySignup = async (req:Request,res:Response,next:NextFunction) =>
    {
        try { 
            const {username,email,password} =req.body;
        const existingAdmin = await Admin.findOne({ email });
        const existingAuthority = await Authority.findOne({email});
        if (existingAdmin || existingAuthority) return res.status(401).send(" Already registered");
            
            const hashedPassword = await hash(password,10);
            const authority = new Authority({
                username: username,
                email: email,
                password: hashedPassword,
                role: 'authority'
              });
              await authority.save();

             res.clearCookie(COOKIE_NAME, {
                domain:"localhost",
                  httpOnly:true,
                  signed:true,
                  path:"/",
                });
                 const token = createToken(authority._id.toString(),authority.email,"7d");
                 const expires = new Date();
                 expires.setDate(expires.getDate()+7);
                 res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,
                  httpOnly:true,
                  signed:true,
                 });
                
            console.log("Function called");
            return res.status(200).json({message:"ok", role:authority.role });
        } catch (error) {
            console.log(error);
            return res.status(200).json({message:"Error" });
        }
    }
    export const authorityLogin = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
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
          domain:"localhost",
            httpOnly:true,
            signed:true,
            path:"/",
          });
           const token = createToken(authority._id.toString(),authority.email,"7d");
           const expires = new Date();
           expires.setDate(expires.getDate()+7);
           res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,
            httpOnly:true,
            signed:true,
           });
          
          return res.status(200).json({ message: "OK", name: authority.username, email: authority.email });
        } catch (error) {
          console.log(error);
          return res.status(200).json({ message: "ERROR", cause: error.message });
        }
      };
    