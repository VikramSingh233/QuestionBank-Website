import path from 'path';
import { ApiError } from '../utils/ApiError.js';  // Custom error handling utility
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