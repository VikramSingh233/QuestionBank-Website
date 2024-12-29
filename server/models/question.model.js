import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const questionSchema = new Schema(
{
    type:{
        type:String,
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


},{timestamps:true}

)
// userSchema.plugin(mongooseAggregatePaginate)
export const Question = mongoose.model("Question",questionSchema)