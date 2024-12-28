import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async (req, _, next) => {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // console.log("Token received:", token);  // Log the token

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("Decoded Token:", decodedToken); // Log the decoded token

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        // console.log("User found:", user); // Log the fetched user

        if (!user) {
            throw new ApiError(401, "Unauthorized");
        }

        req.user = user;
        next();

    } catch (error) {
        // console.error("JWT Error:", error); // Log any errors thrown
        throw new ApiError(401, error?.message || "Invalid access Token");
    }
});