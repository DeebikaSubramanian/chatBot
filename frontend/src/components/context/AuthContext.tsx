import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { checkAuthStatus, loginUser, logOutUser, signUpUser } from "../../helpers/apiCommunicator";
import { useNavigate } from "react-router-dom";

//As we are writing typescript also .tsx file we have define the type as follows.

type User = {
    name:string,
    email:string
}

type UserAuth={
    isLoggedIn:boolean,
    user:User|null,         //means assign User if user not available assign null
    login:(email:string,password:string)=>Promise<void>;   //login function that has these email,password parameters and also that is going to be a promise with void bcz its not going to return anything 
    signup:(name:string,email:string,password:string)=>Promise<void>,
    logout:()=>Promise<void>    
}

const AuthContext=createContext<UserAuth|null>(null);

export const AuthProvider=({children}:{children: ReactNode })=>
        {
             const navigate=useNavigate()
           
const [user,setUser]=useState<User|null>(null)   // <User|null>is the type,(null) is the initial value.
const [isLoggedIn,setIsLoggedIn]=useState(false)

useEffect (()=>{
  async function checkStatus()
  {
    const data=await checkAuthStatus();
     if(data)
    {   
        setUser({email:data.email,name:data.name})
        setIsLoggedIn(true)
    }
  }checkStatus()
},[])

const login=async (email:string,password:string)=>{
    const data=await loginUser(email,password)
    
    if(data)
    {   
        
        setUser({email:data.email,name:data.name})
        setIsLoggedIn(true)
    }
    

}

const signup=async (name:string,email:string,password:string)=>{
const data = await signUpUser(name,email,password)
if(data)
{
    setUser({name:data.name,email:data.email})
    setIsLoggedIn(true)
}
}

const logout=async ()=>{

    
    await logOutUser()
    setIsLoggedIn(false)
    setUser(null)
    navigate('/login')
    window.location.reload()

}

const value={user,isLoggedIn,signup,login,logout};
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuth=()=>useContext(AuthContext)