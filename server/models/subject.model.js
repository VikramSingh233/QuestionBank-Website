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
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   questions:[{ // array of the questions inside the subject
        questionId:{
            type:Schema.Types.ObjectId,
            ref:"Question",
        },
        questionText:{
            type:String,
        }
   }],

    
},{timestamps:true}
);

export const Subject = mongoose.model("Subject",subjectSchema)