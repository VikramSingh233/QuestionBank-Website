import {app} from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
  path:"./.env"
})
const PORT = process.env.PORT||3000;

connectDB()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
})
.catch((err)=>{
  console.log("MongoDb Connection Failed",err)
})





















// import dotenv from 'dotenv';
// import express from 'express';

// import path from 'path';
// import bodyParser from 'body-parser';
// import logger from '../logger.js'
// import morgan from 'morgan'
// // Derive __dirname in ES modules
// const __dirname = path.resolve();  // Use path.resolve to get the absolute directory path
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 

// const morganFormat = ':method :url :status :response-time ms';

// app.use(morgan(morganFormat , {
//   stream:{
//     write:(message)=>{
//       const logObject = {
//         method : message.split(' ')[0],
//         url : message.split(' ')[1],
//         status : message.split(' ')[2],
//         responseTime : message.split(' ')[3],

//       };
//       logger.info(JSON.stringify(logObject));
//     }
//   }
// }));

// // Serve static files from the "css" folder
// app.use('/css', express.static(path.join(__dirname, 'css')));
// app.use('/js', express.static(path.join(__dirname, 'js')));


// // Serve the "public" folder containing HTML files`
// app.use(express.static(path.join(__dirname, 'public')));



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/Dashboard', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'dashboardpage.html'));
// });
// app.get('/MySubject', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'mysubject.html'));
// });
// app.get('/Dashboard/MySubject', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'mysubject.html'));
// });


// // Sample "database" for demo purposes
// let users = [];

// // POST route to handle signup
// app.post('/signup', (req, res) => {
//   console.log(req.body,"signup request received")
//   const { username, email, password } = req.body;

//   // Check if the username already exists (simple check)
//   const existingUser = users.find(user => user.username === username);
//   if (existingUser) {
//     return res.json({ success: false, message: 'Username already taken' });
//   }

//   // Check if the email is already in use (simple check)
//   const existingEmail = users.find(user => user.email === email);
//   if (existingEmail) {
//     return res.json({ success: false, message: 'Email already registered' });
//   }

//   // Save the new user (in a real app, save it to a database)
//   users.push({ username, email, password });

//   // Send a success response
//   // res.json({ success: true, message: 'Signup successful' });
//   res.sendFile(path.join(__dirname, 'public', 'dashboardpage.html'));
//   console.log(users)
// });





// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
