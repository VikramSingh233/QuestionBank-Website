import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/User.model.js";
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    
    try {
        if (!username || !email || !password || !confirmPassword) {
            throw new ApiError(400, "All fields are required.");
        }

        if (password !== confirmPassword) {
            throw new ApiError(400, "Password doesn't match.");
        }

        // Check if user already exists
        const existeduser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existeduser) {
            throw new ApiError(409, "User Already Exists.");
        }

        // Create new user (with hashed password from the pre-save hook)
        const user = await User.create({
            username,
            email,
            password
        });

        console.log("User created:", user); // Log for debugging

        // Fetch created user details (excluding password and refreshToken)
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong! Try again.");
        }

        return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
    } catch (error) {
        console.error("Error registering user:", error); // Log any error for debugging
        throw error; // Throw to be caught by errorHandler middleware
    }
});


export {
    registerUser
}