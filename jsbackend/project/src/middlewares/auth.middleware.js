import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export const verifyJwt = asyncHandler( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer ", "") // authorization: bearer token    with headers in postman or any api call and .replace will replace the Bearer_ to empty string so that it will only left token
        if(!token ){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            //Todo discuss about frontend
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(500, error?.message || "invalid access token")
    }

})