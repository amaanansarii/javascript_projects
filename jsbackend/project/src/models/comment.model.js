import mongoose from 'mongoose'
import Schema from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    video: {
        typeof: Schema.Types.ObjectId,
        ref: "Video"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});


//mongoose middleswares
//mongoose methods search for mongose aggregate paginate

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment", commentSchema)