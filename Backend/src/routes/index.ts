import { Router } from "express";
import userRoutes from "./userRoutes.js";
import chatRoutes from "./chatRoutes.js";

const appRouter=Router()

appRouter.use("/users", userRoutes)

appRouter.use("/chat",chatRoutes)

export default appRouter