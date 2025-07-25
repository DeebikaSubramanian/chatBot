import React from 'react'
import { Box, Button, Typography } from "@mui/material"
import CustomizeInput from "../components/shared/CustomizeInput"
import { RiLoginBoxLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUp = () => {
  const navigate=useNavigate()
const auth=useAuth()

  useEffect(()=>
    {
   
    if(auth?.user)
    {
      navigate('/chat')
    }
  },[auth])

const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  const form = e.currentTarget;
  const formdata = new FormData(form);
  
  const name=formdata.get("name") as string
  const email=formdata.get("email") as string  //as it is typescript type is must 
  const password=formdata.get("password") as string
    // console.log(email)
  try{
    if (!name||!email || !password) {
    toast.error("Fill all the details",{id:"login"});
    return;
  }
    toast.loading("Signing Up...",{id:"login"})
    await auth?.signup(name,email,password)
    toast.success("Registered successfully",{id:"login"})
        
  }
  catch(error)
  {
    console.log(error)
    // toast.error("Sign in Failed",{id:"login"})

  }
  form.reset()
  
}

  return (
    <Box display="flex" flex={1} height={"100%"} width={"100%"} >
      <Box padding={8} mt={8} display={{md:"flex", sm:"none", xs:"none"}}>
        <img src="robot.jpeg" alt="Robot" style={{width:"400px", height:"300px"}}/>
      </Box>
      <Box display={"flex"} flex={{xs:1, md:0.5}} 
      justifyContent={"center"} alignItems={"center"} padding={2} ml={"auto"} mt={16}>
        <form onSubmit={handleSubmit}
        style={{margin:"auto",padding:"30px",
        boxShadow:"10px 10px 20px #000",borderRadius:"10px",border:"none"}}>
      <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",}}>
        <Typography variant="h4" textAlign="center" padding={2} fontWeight={600} >
         Register
        </Typography>
        <CustomizeInput name="name"  type="text" label="Name"></CustomizeInput>
        <CustomizeInput name="email"  type="email" label="Email"></CustomizeInput>
           <CustomizeInput name="password"  type="password" label="Password"></CustomizeInput>
           <Button type="submit" sx={{px:2, py:1, mt:2, width:"400px", borderRadius:2, bgcolor:"#00fffc",
            ":hover":{
              bgcolor:"white",
              color:"black"
            }
           }}>SignUp<RiLoginBoxLine />
</Button> 
      </Box>
        </form>
      </Box>

    </Box>
    )
}

export default SignUp