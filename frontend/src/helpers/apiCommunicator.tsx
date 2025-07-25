import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";


export const signUpUser = async (name:string, email: string, password: string) => {
    
  try {
    const res=await axios.post("/users/signup", {name,email, password }, {
  withCredentials: true
});

    // Success toast
    toast.success(res.data.message, { id: "login" });
    
    return res.data;

  } catch (error: any) {
    const backendErrors = error.response?.data?.errors;

    if (Array.isArray(backendErrors)) {
      // Show all validation errors from backend
      backendErrors.forEach((err: any) => {
        toast.error(err.msg);
      });
    } else {
      // Show generic or single message error
      const message = error.response?.data?.message || "Unable to login";
      toast.error(message, { id: "login" });
    }
    

    throw new Error("Unable to login");
  }
};

export const loginUser = async (email: string, password: string) => {
    
  try {
    const res=await axios.post("/users/login", { email, password }, {
  withCredentials: true
});

    // Success toast
    toast.success(res.data.message, { id: "login" });
    
    return res.data;

  } catch (error: any) {
    const backendErrors = error.response?.data?.errors;

    if (Array.isArray(backendErrors)) {
      // Show all validation errors from backend
      backendErrors.forEach((err: any) => {
        toast.error(err.msg);
      });
    } else {
      // Show generic or single message error
      const message = error.response?.data?.message || "Unable to login";
      toast.error(message, { id: "login" });
    }
    

    throw new Error("Unable to login");
  }
};

export const checkAuthStatus = async () => {
    
  try {
    const res = await axios.get("/users/authStatus", {
  withCredentials: true,
});
     return res.data;
  } 
  catch (error: any) {
    const backendErrors = error.response?.data?.errors;

    if (Array.isArray(backendErrors)) {
      // Show all validation errors from backend
      backendErrors.forEach((err: any) => {
        toast.error(err.msg);
      });
    } else {
      // Show generic or single message error
      const message = error.response?.data?.message || "Unable to authenticate";
      toast.error(message, { id: "login" });
    }
   throw new Error("Unable to authenticate");
    
  }
  
};


export const sendChatRequest = async (message:string) => {
    
  try {
    const res=await axios.post("/chat/new", { message }, {
  withCredentials: true
});   
      const data= res.data
     return data;
  } 
  catch (error: any) {
    const backendErrors = error.response?.data?.errors;

    if (Array.isArray(backendErrors)) {
      // Show all validation errors from backend
      backendErrors.forEach((err: any) => {
        toast.error(err.msg);
      });
    } else {
      // Show generic or single message error
      const message = error.response?.data?.message || "Unable to authenticate";
      toast.error(message, { id: "login" });
    }
   throw new Error("Unable to authenticate");
    
  }
  
};


export const getUserChats = async () => {
    
  try {
    const res=await axios.get("/chat/allChats", {
  withCredentials: true
});   
      const data= res.data
     return data;
  } 
  catch (error: any) {
    const backendErrors = error.response?.data?.errors;

    if (Array.isArray(backendErrors)) {
      // Show all validation errors from backend
      backendErrors.forEach((err: any) => {
        toast.error(err.msg);
      });
    } else {
      // Show generic or single message error
      const message = error.response?.data?.message || "Unable to authenticate";
      toast.error(message, { id: "login" });
    }
   throw new Error("Unable to authenticate");
    
  }
  
};

export const deleteUserChats = async () => {
    
  try {
    const res=await axios.delete("/chat/delete", {
  withCredentials: true
});   
    const data= res.data
     return data;
  } 
  catch (error: any) {
    const backendErrors = error.response?.data?.errors;

    if (Array.isArray(backendErrors)) {
      // Show all validation errors from backend
      backendErrors.forEach((err: any) => {
        toast.error(err.msg);
      });
    } else {
      // Show generic or single message error
      const message = error.response?.data?.message || "Unable to authenticate";
      toast.error(message, { id: "login" });
    }
   throw new Error("Unable to authenticate");
    
  }
  
};

export const logOutUser = async () => {
 
    
  try {
    const res=await axios.get("/users/logout", {withCredentials: true});   
    const data= res.data
    return data;
  } 
  catch (error: any) {
    const backendErrors = error.response?.data?.errors;

    if (Array.isArray(backendErrors)) {
      // Show all validation errors from backend
      backendErrors.forEach((err: any) => {
        toast.error(err.msg);
      });
    } else {
      // Show generic or single message error
      const message = error.response?.data?.message || "Unable to authenticate";
      toast.error(message, { id: "login" });
    }
   throw new Error("Unable to authenticate");
    
  }
  
};