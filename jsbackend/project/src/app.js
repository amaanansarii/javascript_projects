
import express from "express"
import cookieParser from "cookie-parser" //use to add and modify cookies for crud operations in cookies
import cors from "cors"

const app = express();

//middlewares 


app.use(cors({
    origin: process.env.CORS_ORIGIN, // origin = * which allows every origin if we want we can add specific origin.
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // to access json limited
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))
app.use(cookieParser())


//import routes

import userRouter from "./routes/user.route.js";


//routes declaration

app.use("/api/v1/users", userRouter) //  /api/v1/users means standard practice to set the api, v1 means version1 if further changes in api it will be as v2 and the final url will be like
// final url be like https://localhost:3000/api/v1/users/resiter : depends upon which route you are calling.


export { app }