import express from 'express';
import cors from "cors";
const app = express();
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)
 // common middlewares
app.use(express.json({limit:"32kb"}))
app.use(express.urlencoded({extended:true,limit:"32kb"}))
app.use(express.static("public"));

//import routes
import  healthCheckRouter  from './routes/healthcheck.route.js';




//routes

app.use("/api/v1/healthcheck",healthCheckRouter)





export {app}




