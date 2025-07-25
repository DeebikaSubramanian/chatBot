import app from "./app.js"
import { connectToDataBase } from "./db/connection.js";
import dotenv from "dotenv";
dotenv.config();
 

const PORT = process.env.PORT  || 5000

connectToDataBase().then(()=>{
    app.listen(PORT,()=>{
  console.log("Server started at "+PORT)
})
}).catch((error)=>
  console.log(error))

