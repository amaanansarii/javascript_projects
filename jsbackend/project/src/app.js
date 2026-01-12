
import express from "express"
import cookieParser from "cookie-parser" //use to add and modify cookies for crud operations in cookies
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN, // origin = * which allows every origin if we want we can add specific origin.
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // to access json limited
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))
app.use(cookieParser())


export { app }