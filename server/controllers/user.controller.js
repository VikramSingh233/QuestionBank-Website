import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/User.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
    
        // small check for user
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false})
    
        return {accessToken,refreshToken}
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"Something went wrong while generating access and refresh token",error)
    }
}


const registerUser = asyncHandler(async (req, res) => {
    // console.log("register user request coming ", req)
    const { username, email, password, confirmPassword } = req.body;
    
    try {
        if (!username || !email || !password || !confirmPassword) {
            throw new ApiError(400, "All fields are required.");
        }

        if (password !== confirmPassword) {
            throw new ApiError(400, "Password doesn't match.");
        }
        const existeduser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existeduser) {
            throw new ApiError(409, "User Already Exists.");
        }
        const user = await User.create({
            username,
            email,
            password
        });

        // Fetch created user details (excluding password and refreshToken)
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong! Try again.");
        }

        return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
    } catch (error) {
        console.error("Error registering user:", error);
        throw error; 
    }
});


const loginUser = asyncHandler(async (req,res)=>{
    
    const {email,password}=req.body

    if(!email){
        throw new ApiError(400,"Email is required")
    }
    const user = await User.findOne({
        $or: [{ email }]
    })

    if(!user){
        throw new ApiError(404,"User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid email or password")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // check for isloggedinUser
    if(!loggedInUser){
        throw new ApiError(404,"Something Went wrong . try abgain later .")
    }

    const options = {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
    }
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200,
        {
            user: loggedInUser,
            accessToken,
            refreshToken,
            redirectTo: "/home",
        },
        "User logged in successfully" 
    ));

});

const refreshAccessToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"Refresh Token is required")
    }
    try {

// Decodes and verifies the refresh token using the secret key (REFRESH_TOKEN_SECRET).
// Returns the payload of the refresh token (e.g., user ID) if valid.
// If Invalid:
// If the token is expired or tampered with, an error will be thrown by jwt.verify.
       const decodedToken =  jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        )
       const user =  await User.findById(decodedToken?._id)
       if(!user){
        throw new ApiError(401,"Invalid refresh token")
       }

       if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401,"Invalid refresh token")
       }

       const options={
        httpOnly:true,
        secure:process.env.NODE_ENV=="production",
       }

        const {accessToken,refreshToken:newRefreshToken}=await generateAccessAndRefreshToken(user._id)

        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(new ApiResponse(200
            ,{accessToken,refreshToken:newRefreshToken}
            ,"Access token refreshed successfully"))
    } catch (error) {
        throw new ApiError(500,"Something went wrong while refreshing access token")
    }
})


const logoutUser = asyncHandler(async (req, res) => {
    // console.log("User logging out:", req.user)
    // Invalidate user's refresh token
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: "" }
    });

    // Clear cookies with proper options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    res.clearCookie("accessToken", cookieOptions)
       .clearCookie("refreshToken", cookieOptions)
       .status(200)
       .json(new ApiResponse(200, "User logged out successfully"));
});


const updateUserDetails= asyncHandler(async (req,res)=>{

})

const chsngeUserPassword=asyncHandler(async (req,res)=>{
    const {oldpassword,newpassword} = req.body;
    const user = await User.findById(req.user?._id)

    const isPasswordValid = await user.isPasswordCorrect(oldpassword)

    if(!isPasswordValid){
        throw new ApiError(401,"Old password is incorrect")
    }

    user.password = newpassword

    await user.save({validateBeforeSave:false})

    return res.status(201).json(new ApiResponse(200,"password changed Successfully"))
})


export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    chsngeUserPassword
}