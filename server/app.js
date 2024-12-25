import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
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

// Serve static files correctly from 'public' folder
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));   // CSS files from 'public/css'
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));     // JS files from 'public/js'
app.use('/html', express.static(path.join(__dirname, 'public', 'html'))); // HTML files from 'public/html'


app.use(cookieParser())

//import routes
import  healthCheckRouter  from './routes/healthcheck.route.js';
import userRouter from "./routes/user.route.js"
import { errorHandler } from './middlewares/error.middleware.js';



//routes

app.use("/api/v1/healthcheck",healthCheckRouter)
app.use("/api/v1/user",userRouter)

 // serving static files 

// Route for login page
app.get('/login', (req, res) => {
    const loginPage = path.join(__dirname, 'public', 'html', 'login.html');
    console.log('Path to login.html:', loginPage);  // Log the final path for debugging
    res.sendFile(loginPage, (err) => {
        if (err) {
            console.error('Error sending login.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Route for home page(index.html)
app.get('/home', (req, res) => {
    const homePage = path.join(__dirname, 'public', 'html', 'home.html');
    console.log('Path to home.html:', homePage);  // Log the final path for debugging
    res.sendFile(homePage, (err) => {
        if (err) {
            console.error('Error sending home.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});


app.use(errorHandler)
export {app}





