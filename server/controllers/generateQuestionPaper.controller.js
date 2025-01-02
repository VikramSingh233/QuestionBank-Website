import { ApiError } from '../utils/ApiError.js';  // Custom error handling utility
import { User } from '../models/User.model.js';
import {Subject} from '../models/subject.model.js';
import {Question} from '../models/question.model.js';


export const generateQuestionPaper =async(req,res)=>{
    console.log(req.body)
    console.log(req.body.data.questionDetailForBackend)
    // try {
    //     const userId = req.user._id; // User ID from JWT middleware
    //     const user = await User.findById(userId);
    //     if (!user) {
    //         return res.status(404).json({ message: "User not found" });
    //     }
    // } catch (error) {
        
    // }
}