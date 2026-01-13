import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";

//bcrypt use to encode our passwords

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, //use to trip the value of any username
        index: true //for index true it will do database searching use for searching
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, //use to trip the value of any username
    },
    fullName: {
        type: String,
        required: true,
        trim: true, //use to trip the value of any username
        index: true
    },
    avatar: {
        type: String, //cloudinary url we will use like aws where we upload files and it will give accessible urls to use
        required: true,
    },
    coverImage: {
        type: String, //cloudinary url
    }, 
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: { //we have to keep the password encrypted so that we'll give 1234 but saved as @#$$^@%^$%^
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) { // pre used to perform any function before saving the password worked as a middle ware
    if(!this.isModified("password")) return next(); // this will check password is modified or not if it is not modified then return next and if it is modified then bcrypt it below.

    this.password = bcrypt.hash(this.password, 10) // use to hash or bcrypt the password
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) { // this will check the current passowrd and the password this is hashed are same or not
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    const jwtPayload = {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }
    const expiresIn = { expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, expiresIn)
}

userSchema.methods.generateRefreshToken = function(){
    const jwtPayload = {
        _id: this._id
    }
    const expiresIn = { expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    return jwt.sign(jwtPayload, process.env.REFRESH_TOKEN_SECRET, expiresIn) 
}
export const User = mongoose.model("User", userSchema)