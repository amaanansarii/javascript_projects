import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"

const registerUser = asyncHandler( async (req, res) => {

    // res.status(200).json({
    //     message: "amaan ansari"
    // })


        // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    //make request with object email and password in postman

    //use details from frontend
    const {fullName, username, email, password} = req.body
    console.log("email",email)

    //one of the method to validate but it can be validate using different method advanced method
    // if(fullName === ""){
    //     throw new ApiError(400, "full name is required")
    // }

    // for above method we will check for the if condition multiple times for every field but for below thing it will give the validation for each field in single array using some method.

    if([fullName, email, username, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    

    res.status(200).json({message: "ok"})
});

export { registerUser }




// const generateAccessAndRefereshTokens = async(userId) =>{
//     try {
//         const user = await User.findById(userId)
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()

//         user.refreshToken = refreshToken
//         await user.save({ validateBeforeSave: false })

//         return {accessToken, refreshToken}


//     } catch (error) {
//         throw new ApiError(500, "Something went wrong while generating referesh and access token")
//     }
// }