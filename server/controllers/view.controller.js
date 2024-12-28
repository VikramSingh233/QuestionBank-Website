import path from 'path';
import { ApiError } from '../utils/ApiError.js';  // Custom error handling utility
import { User } from '../models/User.model.js';
import {Subject} from '../models/subject.model.js'
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


export const renderSubjectPage = async (req, res) => {
    try {
        const { subject } = req.params; // Extract the subject from the request parameters
        const userId = req.user._id; // Assume user ID is populated by middleware

        // Fetch the user and their subjects
        const user = await User.findById(userId).populate("subjects.subjectId");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Check if the subject exists in the user's subjects
        const userSubject = user.subjects.find(
            (sub) => sub.subjectName.toLowerCase() === subject.toLowerCase()
        );

        if (!userSubject) {
            return res.status(404).json({ message: "Subject not found for this user" });
        }

        console.log(`User ID: ${userId}, Subject: ${userSubject.subjectName}`);

        // Serve the HTML file
        res.sendFile(path.join(__dirname, "..", "public", "html", "subjectMaterial.html"));
    } catch (error) {
        console.error("Error loading the Subject page:", error); // Log error details for debugging
        throw new ApiError(500, "Error loading the Subject page");
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

