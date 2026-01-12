import mongoose from "mongoose";
import { Schema } from "mongoose";

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
    fullname: {
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

export const User = mongoose.model("User", userSchema)