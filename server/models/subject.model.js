import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
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
userSchema.plugin(mongooseAggregatePaginate)
export const Subject = mongoose.model("Subject",subjectSchema)