import mongoose from "mongoose";
import { Schema } from "mongoose";

const subscriptionsSchema = new Schema({
    subscriber: {
        typeof: Schema.types.ObjectId, // the one who is subscribing
        ref: "User"
    },
    channel: {
        typeof: Schema.types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription", subscriptionsSchema)


// [
//     {
//         $lookup: {
//             from: "authors",
//             localField: "author_id",
//             foreignField: "_id",
//             as: "author_details"
//         }
//     },
//     {
//         $addFields: {
//             author_details: {
                
//             }
//         }
//     }
// ]