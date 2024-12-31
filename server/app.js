import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { errorHandler } from './middlewares/error.middleware.js';


import multer from 'multer';
const upload = multer();

const app = express();
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)
 // common middlewares
 app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
const __dirname = path.resolve();  // Using the correct root path resolution
app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, 'views'));
// Serve static files correctly from 'public' folder
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));   // CSS files from 'public/css'
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));     // JS files from 'public/js'
app.use('/html', express.static(path.join(__dirname, 'public', 'html'))); // HTML files from 'public/html'


app.use(cookieParser())

//import routes
import  healthCheckRouter  from './routes/healthcheck.route.js';
import userRouter from "./routes/user.route.js"
import viewsRouter from "./routes/view.route.js";

import feedback from './routes/feedback.route.js';


//routes for api

app.use("/api/v1/healthcheck",healthCheckRouter)
app.use("/api/v1/user",userRouter)
app.use("/", viewsRouter);
app.use("/feedback",feedback)





app.use(errorHandler)
export {app}





