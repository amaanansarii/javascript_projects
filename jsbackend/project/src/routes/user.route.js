
import { Router } from "express";
import { 
    changeCurrentPassword, 
    getCurrentUser, 
    getUserChannelProfile, 
    getWatchHistory, 
    logInUser, 
    logOutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage 
} from "../controllers/user.controller.js";
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
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/change-password").post(verifyJwt, changeCurrentPassword)
userRouter.route("/current-user").get(verifyJwt, getCurrentUser)
userRouter.route("/update-accountDetails").patch(verifyJwt, updateAccountDetails)
userRouter.route("/avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar)
userRouter.route("/coverImage").patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage)
userRouter.route("/channel/:username").get(verifyJwt, getUserChannelProfile)
userRouter.route("/history").get(verifyJwt, getWatchHistory)

export default userRouter;