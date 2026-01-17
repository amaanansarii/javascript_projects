
//conecting database first approach

import mongoose from "mongoose";
import DB_NAME from "../contants.js"

const connectDB = async () => {
    try {
        console.log("mongo")
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("mongo connected")
        console.log(`mongodb connect !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongo connnection error", error)
        process.exit(1)
    }
}

export default connectDB;

// //connecting database second approach

// import mongoose from "mongoose"
// import { DB_NAME } from "../contants"
// import express from "express";

// const app = express()
// (
//     async () => {
//         try {
            
//             await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//             app.on("error", (error) => {
//                 console.log("ERR", error);
//                 throw error
//             })

//             app.listen(process.env.MONGODB_URI, () => {
//                 console.log(`App is listening on port ${process.env.PORT}`)
//             });
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
// )()