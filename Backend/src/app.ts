import express from "express";
import {config} from "dotenv"
import morgan from "morgan"
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"

config()
const app=express()

// const allowedOrigins = [
//   "https://chatbot-frontend-cr87.onrender.com",
//   "http://localhost:5173"
// ];
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

app.use(
  cors({
    origin: "https://chatbot-frontend-cr87.onrender.com",
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))                     //cookie parser is used to send cookies from backend to frontend

//this is only for development will remove it in production
app.use(morgan("dev"))

app.use("/api/v1",appRouter)

export default app