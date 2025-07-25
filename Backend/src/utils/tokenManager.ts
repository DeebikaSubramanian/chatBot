import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { COOKIE_NAME } from "./constants.js";


export const createToken = (
  id: string,
  email: string,
  expiresIn: string 
): string => {
  const payload = { id, email };
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET is missing");
    //@ts-ignore
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const verifyToken=(req:Request,res:Response,next:NextFunction)=>
{
    const token=req.signedCookies[`${COOKIE_NAME}`]
    if(!token || token.trim()==="")
    {
        return res.status(401).json({message:"Logged Out,Login to access ChatGpt"})
    }
    return new Promise<void>((resolve,reject)=>{
        const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET is missing");
  //@ts-ignore
            return jwt.verify(token,secret,(error,success)=>{
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