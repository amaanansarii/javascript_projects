import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudindary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { json } from "express"

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

    console.log(req.body, "---req body in usercontroller")
    const {fullName, username, email, password} = req.body

    //one of the method to validate but it can be validate using different method advanced method
    // if(fullName === ""){
    //     throw new ApiError(400, "full name is required")
    // }

    // for above method we will check for the if condition multiple times for every field but for below thing it will give the validation for each field in single array using some method.

    if([fullName, email, username, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }

    console.log(req.files,"req files")
    //upload middle ware multer hume req.body k andar or chize add krke deta h gives req.files ka access
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath  = req.files.coverImage[0].path;
    }

    // or another thing is below to check file is present or not

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required!")
    }

    const avatar = await uploadOnCloudindary(avatarLocalPath);
    const coverImage = await uploadOnCloudindary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required.")
    }

    const user = await User.create({
        fullName, 
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    
    return res.status(201), json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

    //api call in postman using form-data with all the key values like username full name password etc.

    // res.status(200).json({message: "ok"})
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