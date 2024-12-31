import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path:"./.env"
})

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


import nodemailer from 'nodemailer';
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
            password,
            oldPassword:password
        });

        // Fetch created user details (excluding password and refreshToken)
        const createdUser = await User.findById(user._id).select("-password -refreshToken -oldPassword");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong! Try again.");
        }
  const transporter = nodemailer.createTransport({
          service: 'gmail', // or any email provider (e.g., Outlook, Yahoo)
          auth: {
              user:process.env.EMAIL_AUTH_USER,
              pass: process.env.EMAIL_AUTH_PASS, 
          }
      });
  
      // Define the email options
      const mailOptions = {
          from: process.env.EMAIL_AUTH_USER,
          to: email, // Recipient's email
          subject: 'Welcome to Q-banker!',
          html: `
          <h2>Welcome to Q-Banker, ${username}!</h2>
          <p>Thank you for registering on Q-Banker, the ultimate hub for your academic preparation and learning journey!</p>
          <p>Here, you can explore and practice a vast collection of questions across various subjects and levels. Get ready to boost your knowledge and ace your exams with our platform!</p>
          <p>If you need help or have any questions, feel free to reach out by replying to this email. We're here to support you every step of the way.</p>
          <br>
          <p><strong>Happy Learning!</strong></p>
          <p>Best Regards,<br><strong>Q-Banker Team</strong></p>
          <hr>
          <small>This is an automated email. Please do not reply directly to this email. For queries, contact us at <a href="mailto:support@qbanker.com">support@qbanker.com</a>.</small>
      `
      };
  
      try {
          const info = await transporter.sendMail(mailOptions);
      } catch (err) {
          console.error('Error sending email:', err);
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

const changeUserPassword = asyncHandler(async (req, res) => {
    const { email, oldPassword, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        throw new ApiError(401, "Old password is incorrect");
    }
    user.password = password;
    await user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new ApiResponse(200, "Password changed successfully"));
});


export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changeUserPassword
}