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
app.use(
    cors({
      credentials: true,
      origin: true
    })
   );



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
  


app.use(express.json());


HelloRoutes(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
app.listen(process.env.PORT || 4000); 