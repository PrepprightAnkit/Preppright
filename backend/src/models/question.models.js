import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes:{
        type:Number,
        required:true,
        default:0
    },
    answer:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Answer"
        }
    ]

},{timestamps:true})

export const Question = mongoose.model("Question", questionSchema)