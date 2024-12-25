import mongoose ,{Schema} from "mongoose";

const questionSchema = new Schema(
{
    type:{
        type:String,
        enum:["MCQ","Descriptive"],
        required:true,
    },
    question:{
        type:String,
        required:true,
        index:true,
    },
    solution:{
        type:String
    },
    options:[{
        option:{
            type:String,
        },
        isCorrect:{
            type:Boolean,
            default:false,

        },
    }],

    topicName:{
        type:String,
        required:true,
    },
    tagName:{
        type:String,
        required:true,
    },
    mark:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
       },
    updatedAt:{
        type:Date,
        default:Date.now
       }

}

)

export const Question = mongoose.model("Question",questionSchema)