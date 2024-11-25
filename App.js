// const express = require('express');
import express from 'express';
import HelloRoutes from './Hello.js';
import Lab5 from "./Lab5/index.js";
import UserRoutes from './Kanbas/Users/routes.js';
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import ModuleRoutes from "./Kanbas/Modules/routes.js";


const app = express();
app.use(express.json());
// Updated CORS Configuration
app.use(
    cors({
        origin: "https://a5--kanbas-react-web-app-24.netlify.app", // Allow only your frontend
        credentials: true, // Allow cookies/sessions from frontend
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);
app.options("*", cors()); // Handle preflight requests

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));






HelloRoutes(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
app.listen(process.env.PORT || 4000); 