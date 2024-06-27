import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORGIN,
        credentials: true
    }
));

app.use(express.json({limit:"16kb"}))
app.use(urlencoded())
app.use(express.urlencoded())
app.use(cookieParser())

//routes import 

import companyRouter from "./routes/company.routes.js"; // Adjust the path as necessary
//routes decalration 

app.use("/api/v1/users", companyRouter)

import professionalRouter from "./routes/professional.routes.js"; 

app.use("/api/v1/users", professionalRouter)

export {app}
