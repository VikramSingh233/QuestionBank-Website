import mongoose ,{Schema} from "mongoose";

const subjectSchema = new Schema(
{
   subjectName:{
    type:String,
    required:true,
   },
   teacherName:{
    type:String,
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   questions:[{ // array of the questions inside the subject
    type:mongoose.Schema.Types.ObjectId,
    ref:"Question"
   }],
   createdAt:{
    type:Date,
    default:Date.now
   },
   updatedAt:{
    type:Date,
    default:Date.now
   }
    
});

export const Subject = mongoose.model("Subject",subjectSchema)