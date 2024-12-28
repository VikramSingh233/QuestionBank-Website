import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
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
        type:String,
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
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
   return  await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function(){
    // short lived access token
   return  jwt.sign({
        _id:this._id,
        email:this.email,
    },
process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}



userSchema.methods.generateRefreshToken = function(){ 
    // long lived access token
   return  jwt.sign({
        _id:this._id,
    },
process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}

userSchema.plugin(mongooseAggregatePaginate)
export const User = mongoose.model("User",userSchema)