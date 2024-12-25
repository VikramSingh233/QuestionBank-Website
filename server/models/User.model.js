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
        required:[true,"Password is required"]
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
    refreshToken:{
        type:String
    }
},{
    timestamps:true
}

);

export const User = mongoose.model("User",userSchema)