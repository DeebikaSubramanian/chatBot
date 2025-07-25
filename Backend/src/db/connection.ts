import {connect,disconnect} from "mongoose"

 async function connectToDataBase(){

    try{
        await connect(process.env.MONGODB_URL)
    }
    catch(error)
    {
        console.log(error)
        throw new Error("cannot connect to mongoDB")
    }
}

 async function disconnectToDataBase(){

    try{
        await disconnect()
    }
    catch(error)
    {
        console.log(error)
        throw new Error("cannot disconnect to mongoDB")
    }
}

export {connectToDataBase,disconnectToDataBase}