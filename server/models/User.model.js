import mongoose ,{Schema} from "mongoose";

const userSchema = new Schema(
{
    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        required:true
    },
    profilePic:{
        type:String,
    },
    subjects:[{
       subjectId:{
        type:Schema.Types.ObjectId,
        ref:"Subject",
       },
       subjectName:{
        type:String,
       }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
}

);

export const User = mongoose.model("User",userSchema)