import { Request, Response,NextFunction } from "express";
import User from "../model/user.js";
import { configureOpenAI } from "../config/openaiConfig.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion =async (req:Request,res:Response,next:NextFunction )=>{
    
    const {message}=req.body
    try{

        const user=await User.findById(res.locals.jwtData.id)
    console.log(res.locals.jwtData )
    if(!user)
    {
        return res.send(400).json({message:"user not registered or Token expired"})
       
    }

    //grab chats of user
   
    const chats=user.chats.map(({role,content})=>({role,content})) as ChatCompletionRequestMessage[]   //role and content are from model which we already defined. check models. there user have name,password,email and chats. chats have role and content.
   
    chats.push({content:message,role:"user"})  //to push into chats 
    user.chats.push({content:message,role:"user"})  //as well as we have to push it into user
     
    //then send all chats with new one to openAi Api

    const config=configureOpenAI();
    const openai=new OpenAIApi(config)
   const chatResponse = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: chats
});

const Message = chatResponse.data.choices[0]?.message;

if (Message) {
  user.chats.push(message); // only push if message is defined
}
    await user.save()
    return res.status(200).json({chats:user.chats})

    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({message:"Something went Wrong"})
        
    }
    }


export const sendChatsToUser= async (req:Request,res:Response,next:NextFunction) => {
  try {
    
    const user=await User.findById(res.locals.jwtData.id)

    console.log(res.locals.jwtData.id)
   
    if(!user)
       {return res.status(401).json({message:"User not Registered or Token malfunctioned"})}
    if(user._id.toString()!==res.locals.jwtData.id)
    {
      return res.status(401).json({message:"Permission is not matched"})
    }
    return res.status(200).json({ message: "Success", chats:user.chats });
  } catch (error) {
    const err = error as Error;
    return res
      .status(400)
      .json({ message: "Cannot Login", cause: err.message });
  }
};

export const deleteChats= async (req:Request,res:Response,next:NextFunction) => {
  try {
    
    const user=await User.findById(res.locals.jwtData.id)

    console.log(res.locals.jwtData.id)
   
    if(!user)
       {return res.status(401).json({message:"User not Registered or Token malfunctioned"})}
    if(user._id.toString()!==res.locals.jwtData.id)
    {
      return res.status(401).json({message:"Permission is not matched"})
    }

    //@ts-ignore
    user.chats=[]
    await user.save()
    return res.status(200).json({ message: "Deleted"});
  } catch (error) {
    const err = error as Error;
    return res
      .status(400)
      .json({ message: "Cannot Delete", cause: err.message });
  }
};
