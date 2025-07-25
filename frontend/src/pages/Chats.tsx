// import React from 'react'

import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../components/context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import {IoMdSend} from "react-icons/io"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/apiCommunicator";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";


type Message={role:"user"|"assistant",content:string}

const Chats = () => {

  
  const navigate=useNavigate()
  const auth = useAuth();
  const inputRef=useRef<HTMLInputElement|null>(null)
  const [chatMessages,setChatMessages]=useState<Message[]>([])
 
  const handleSubmit= async ()=>{
    const content=inputRef.current?.value as string;
  
    if(inputRef&&inputRef.current)
        {
             inputRef.current.value="";
            //  console.log("inputRef="+inputRef,"inputRef.current=" +inputRef.current,"inputRef.current.value=" +inputRef.current.value)
        }

    const newMessage : Message={role:"user",content}
    setChatMessages((prev)=>[...prev,newMessage])
    const chatData=await sendChatRequest(content)
    setChatMessages([...chatData.chats])
        
  }
 const handleDeleteChats=async()=>{

        try{
          toast.loading("Deleting Chats",{id:"login"})
          await deleteUserChats();
          setChatMessages([])
          // console.log(chatMessages)
          toast.success("Cleared Successfully",{id:"login"})
        }
        catch(err)
        {
          console.log(err)
          toast.error("Failed to Clear Chats",{id:"login"})
        }

 }

  useLayoutEffect( ()=>{
    if(auth?.isLoggedIn && auth.user)
    {
      toast.loading("Loading Chats",{id:"login"})
      getUserChats().then((data)=>{
        setChatMessages([...data.chats])
        if(data.chats.length)
        toast.success("Successfully loaded chats",{id:"login"})
        if(data.chats.length==0)
        {
          toast.success(" Messages Cleared. Nothing to show",{id:"login"})
          
        }
      })
      .catch((err)=>
      {
        console.log(err)
         toast.loading("Failed to load chats",{id:"login"})
      })
    }
  },[auth])

  useEffect(()=>
    {
   
    if(!auth?.user)
    {
      navigate('/login')
    }
  },[auth])


  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: "3",
        gap: "3",
      }}
    >
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "90%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "Work Sans" }}>
            You are talking to a chatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "Work Sans", my: 4, p: 3 }}>
            You can ask some questions related to
            Business,Knowledge,Advice,Education,etc.,But avoid sharing personal
            information.
          </Typography>
          <Button onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": { bgcolor: red.A400 },
            }}
          >
            CLEAR CONVERSATION
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "30px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model-GPT
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((e, index) => (
            //@ts-ignore   this is not a comment line. as it starts with @ this will ignore the redline for the next line. here we have type error in role so to avoid that for now.
            <ChatItem content={e.content} role={e.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            marginRight: "none",
          }}
        >
          {""}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
            <IconButton onClick={handleSubmit} sx={{ml:"auto",color:"white",mx:1}}><IoMdSend></IoMdSend></IconButton>

        </div>
      </Box>
    </Box>
  );
};

export default Chats;
