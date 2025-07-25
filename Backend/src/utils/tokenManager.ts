import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { COOKIE_NAME } from "./constants.js";
import { resolve } from "path";
import { rejects } from "assert";
import { error } from "console";

export const createToken=(id:String,email:String,expiresIn)=>{    //these are just three parameters whatever we need. we have to send the values while this function calling. we call this function in userControllers.ts file
    const payload={id,email};
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn})  
    return token
}

export const verifyToken=(req:Request,res:Response,next:NextFunction)=>
{
    const token=req.signedCookies[`${COOKIE_NAME}`]
    if(!token || token.trim()==="")
    {
        return res.status(401).json({message:"Logged Out,Login to access ChatGpt"})
    }
    return new Promise<void>((resolve,reject)=>{
            return jwt.verify(token,process.env.JWT_SECRET,(error,success)=>{
    if(error)
    {
        reject(error.message)
        return res.status(401).json({message:"Token Expired"})
    }
    else{
        resolve()
        res.locals.jwtData=success;   
        return next();
    }
})
    })

}