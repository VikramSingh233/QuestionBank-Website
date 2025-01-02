import path from 'path';
import { ApiError } from '../utils/ApiError.js';  // Custom error handling utility
import { User } from '../models/User.model.js';
import {Subject} from '../models/subject.model.js';
import {Question} from '../models/question.model.js';
const __dirname = path.resolve(); 
// Render Home Page
export const renderHomePage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public',"html", 'home.html'));  // Path to Home Page
    } catch (error) {
        throw new ApiError(500, "Error loading the Home page", error);
    }
};

// Render About Us Page
export const renderAboutPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public',"html", 'aboutUs.html'));  // Path to About Us page
    } catch (error) {
        throw new ApiError(500, "Error loading the About Us page", error);
    }
};

// Render Contact Us Page
export const renderContactPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public',"html", 'contactUs.html'));  // Path to Contact Us page
    } catch (error) {
        throw new ApiError(500, "Error loading the Contact Us page", error);
    }
};

// Render Profile Page
export const renderProfilePage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public',"html", 'profile.html'));  // Path to Profile page
    } catch (error) {
        throw new ApiError(500, "Error loading the Profile page", error);
    }
};

// Render My Subject Page
export const renderMySubjectPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', "html",'mySubject.html'));  // Path to My Subjects page
    } catch (error) {
        throw new ApiError(500, "Error loading the My Subjects page", error);
    }
};

export const renderForgotPasswordPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', "html",'forgotPassword.html'));  // Path to My Subjects page
    } catch (error) {
        throw new ApiError(500, "Error loading the My Subjects page", error);
    }
};






// Render Login Page (this page does not require authentication)
export const renderLoginPage = (req, res) => {
    try {
        // Update the path if necessary - ensure this path is correct and matches your folder structure
        res.sendFile(path.join(__dirname, "public", "html", "login.html"));
    } catch (error) {
        console.error("Error loading the login page:", error); // Log error details for debugging
        throw new ApiError(500, "Error loading the login page", error);
    }
};



export const getSubjects=async(req,res)=>{
    try {
        const userId = req.user._id; // User ID from JWT middleware
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const subjects = user.subjects;
        const username = user.username;
        const TotalSubjects = subjects.length;
        let TotalNumberOfQuestions = 0;
        let subjectWithNumberOfQuestion=[];
        let Top2Subject=[];
        for (const subject of subjects) {
            let response = await Subject.findById(subject.subjectId);
            if (response) {
                TotalNumberOfQuestions += response.questions.length;
                subjectWithNumberOfQuestion.push({subjectName:subject.subjectName,numberOfQuestions:response.questions.length});
            }
        }
        subjectWithNumberOfQuestion.sort((a, b) => b.numberOfQuestions - a.numberOfQuestions);
        Top2Subject.push(subjectWithNumberOfQuestion[0]);
        Top2Subject.push(subjectWithNumberOfQuestion[1]);
        
        res.status(200).json({ subjects , username,TotalSubjects,TotalNumberOfQuestions,Top2Subject });
    } catch (error) {
        console.error("Error retrieving subjects:", error);
        res.status(500).json({ message: "Error retrieving subjects", error });
    }
}
export const getSubjectDetails = async (req, res) => {
    try {
        const userId = req.user._id; 
        const subjectName = req.params.subject; 

        const user = await User.findById(userId)
            .populate({
                path: "subjects.subjectId",
                populate: {
                    path: "questions.questionId",
                },
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the requested subject in the user's subjects
        const userSubject = user.subjects.find(
            (sub) => sub.subjectName.toLowerCase() === subjectName.toLowerCase()
        );
        if (!userSubject) {
            return res.status(404).json({ message: "Subject not found in user's list" });
        }

        // Fetch the full subject details from the database
        const subjectDetails = await Subject.findById(userSubject.subjectId._id)
            .populate("questions.questionId");
        if (!subjectDetails) {
            return res.status(404).json({ message: "Subject not found in the database" });
        }

        // Prepare data for rendering
        const dataToRender = {
            subjectName: subjectDetails.subjectName,
            subjectId: subjectDetails._id,
            teacherName: subjectDetails.teacherName || "Unknown Teacher",
            // questions: subjectDetails.questions.map((q) => ({
            //     text: q.questionId.question,
            //     marks: q.questionId.mark || "N/A",
            //     topic: q.questionId.topicName || "N/A",
            //     tags: q.questionId.tagName || "N/A",
            // })),
        };
        // Render the EJS template
        res.status(200).render("subjecttemplate", dataToRender); 
    } catch (error) {
        console.error("Error retrieving subject details:", error);
        res.status(500).json({ message: "Error retrieving subject details", error });
    }
};




export const AddQuestion = async (req, res) => {
    try {
        const questionData = JSON.parse(req.body.data);
        const { type, question, solution, topicName, tagName, mark, options, subject: subjectName } = questionData;

        // console.log("Parsed question data:", questionData);
        if (!type || !question || !topicName || !tagName || !mark || !subjectName) {
            return res.status(400).json({ success: false, message: "All required fields must be filled." });
        }

        const subject = await Subject.findOne({ subjectName: decodeURIComponent(subjectName).trim() });
        if (!subject) {
            return res.status(404).json({ success: false, message: "Subject not found." });
        }
        if (type === "mcq" && (!options || options.length === 0)) {
            return res.status(400).json({ success: false, message: "Options must be provided for MCQ questions." });
        }

        options.forEach((opt) => {
            if (!opt.option || typeof opt.isCorrect !== "boolean") {
                return res.status(400).json({ success: false, message: "Invalid option format." });
            }
        });
        const newQuestion = {
            type,
            question,
            solution,
            options,
            topicName,
            tagName,
            mark: parseInt(mark, 10),
            subject: subject._id,
            createdBy: req.user._id,
        };

        // Save the question
        const createdQuestion = await Question.create(newQuestion);
        await createdQuestion.save();

        // Add question to subject's questions array
        subject.questions.push({ questionId: createdQuestion._id, questionText: createdQuestion.question });
        await subject.save();

        res.status(201).json({ success: true, message: "Question added successfully!", question: createdQuestion });
    } catch (error) {
        console.error("Error Adding Question:", error);
        res.status(500).json({ success: false, message: "Error adding question.", error });
    }
};


  

export const AddnewSubject = async (req, res) => {
    const { subjectName, teacherName } = req.body;
    const userId = req.user._id;

    try {
        
        if (!subjectName) {
            throw new ApiError(400, "Subject name is required");
        }
        const existingSubject = await Subject.findOne({
            subjectName,
            createdBy: userId,
        });

        if (existingSubject) {
            return res.status(400).json({
                message: "Subject already exists for this user",
                subjectId: existingSubject._id,
            });
        }
        // Create a new subject
        const newSubject = await Subject.create({
            subjectName,
            teacherName: teacherName || "Not Assigned", 
            createdBy: userId,
        });
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        user.subjects.push({
            subjectId: newSubject._id,
            subjectName: newSubject.subjectName,
        });

        await user.save();
        res.status(201).json({
            success: true,
            message: "Subject added successfully",
            subject: { subjectId: newSubject._id, subjectName: newSubject.subjectName },
        });
    } catch (error) {
        console.error("Error adding new subject:", error);
        throw new ApiError(500, "Error adding new subject");
    }
};

