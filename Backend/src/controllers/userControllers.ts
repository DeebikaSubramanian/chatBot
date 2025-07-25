import { NextFunction,Request,Response } from "express"
import User from "../model/user.js"
import { compare, hash } from "bcrypt"
import { createToken } from "../utils/tokenManager.js"
import { COOKIE_NAME } from "../utils/constants.js"

export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const users=await User.find()
        return res.status(200).json({message:"OK", users})
    }
    catch(error)
    {
      const err = error as Error;
        return res.status(400).json({message:"Cannot Found User Details",cause:err.message})
    }
}

export const postAllUsers = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const {name,email,password} = req.body;
    const existingUser=await User.findOne({email})
    if(existingUser) return res.status(401).send("This email is already registered")
    const hashedPassword=await hash(password,10)
    const user= new User({name,email,password:hashedPassword})
    await user.save()    
    
    //create token and save cookie

    //COOKIE_NAME is a name of the cookie we provide, it can be anything.  this stmt is to clear cookie first then start and we define the name in constant.ts file.
    //domain will once we deploy. for now its localhost.
    res.clearCookie(COOKIE_NAME,{httpOnly:true,signed:true,domain:"localhost"})  

        //for jwt token
        const token=createToken (user._id.toString(),user.email,"7d")  //we have these three parameters in createToken function defined in tokenManager.ts file. check that.
        
        //setting the login to be expires after one week that is seven days
        const expires=new Date();
        expires.setDate(expires.getDate()+7)
    
        //setting http only for cookies  
    
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true}) 


    return res.status(200).json({ message: "Registered Successfully", name:user.name,email:user.email });
  } catch (error) {
    const err = error as Error;
    return res
      .status(400)
      .json({ message: "Cannot Register User Details", cause: err.message });
  }
};


export const loginUsers = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const {email,password} = req.body;
    const user=await User.findOne({email})
   
    if(!user)
       {return res.status(401).send({message:"Invalid User Name"})}
    const isPasswordCorrect=await compare (password,user.password)
    if(!isPasswordCorrect)
    {return res.status(403).send({message:"Invalid Password"})}


    //COOKIE_NAME is a name of the cookie we provide, it can be anything.  this stmt is to clear cookie first then start and we define the name in constant.ts file.
    //domain will once we deploy. for now its localhost.
    res.clearCookie(COOKIE_NAME,{httpOnly:true,signed:true})  

        //for jwt token
        const token=createToken (user._id.toString(),user.email,"7d")  //we have these three parameters in createToken function defined in tokenManager.ts file. check that.
        
        //setting the login to be expires after one week that is seven days
        const expires=new Date();
        expires.setDate(expires.getDate()+7)
    
        //setting http only for cookies  
    
        res.cookie(COOKIE_NAME,token,{path:"/",expires,httpOnly:true,signed:true}) 
    return res.status(200).json({ message: "Login Successfully", name:user.name,email:user.email });
  } catch (error) {
    const err = error as Error;
    return res
      .status(400)
      .json({ message: "Cannot Login", cause: err.message });
  }
};

export const verifyUser = async (req:Request,res:Response,next:NextFunction) => {
  try {
    
    const user=await User.findById(res.locals.jwtData.id)

    console.log(res.locals.jwtData.id)
   
    if(!user)
       {return res.status(401).json({message:"User not Registered or Token malfunctioned"})}
    if(user._id.toString()!==res.locals.jwtData.id)
    {
      return res.status(401).json({message:"Permission is not matched"})
    }
    return res.status(200).json({ message: "Login Successfully", name:user.name,email:user.email });
  } catch (error) {
    const err = error as Error;
    return res
      .status(400)
      .json({ message: "Cannot Login", cause: err.message });
  }
};

export const UserLogOut = async (req:Request,res:Response,next:NextFunction) => {
  try {
    
    const user=await User.findById(res.locals.jwtData.id)

    // console.log(res.locals.jwtData.id)
   
    if(!user)
       {return res.status(401).json({message:"User not Registered or Token malfunctioned"})}
    if(user._id.toString()!==res.locals.jwtData.id)
    {
      return res.status(401).json({message:"Permission is not matched"})
    }

     res.clearCookie(COOKIE_NAME,{httpOnly:true,signed:true,path:"/"})  

    return res.status(200).json({ message: "Ok", name:user.name,email:user.email });
  } catch (error) {
    const err = error as Error;
    return res
      .status(400)
      .json({ message: "Cannot Logout", cause: err.message });
  }
};

