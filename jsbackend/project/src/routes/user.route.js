
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const userRouter = Router();

userRouter.route("/register").post(
    registerUser
    )

export default userRouter;