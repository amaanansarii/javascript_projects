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

import { asyncHandler } from "../utils/asyncHandler.js"

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

    res.status(200).json({message: "ok"})
});

export { registerUser }