
import nodemailer from 'nodemailer';
import { ApiError } from '../utils/ApiError.js';  

export const feedbackContact= async(req,res)=>{
    const { name, email, message } = req.body;
    // console.log(name,email,message)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_AUTH_USER,
            pass:EMAIL_AUTH_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_AUTH_USER,
        to: process.env.EMAIL_AUTH_USER,
        subject: 'New Form Submission',
        text: `New form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            return new ApiError("500", "Error sending email", err);
        }
        res.json({ message: "Form submitted successfully" });

    });
}



