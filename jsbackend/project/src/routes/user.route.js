
import { Router } from "express";
import { logInUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

userRouter.route("/login").post(logInUser)

//secured route
userRouter.route("/logout").post(verifyJwt, logOutUser)

export default userRouter;