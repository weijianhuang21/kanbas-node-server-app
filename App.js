// // const express = require('express');
// import express from 'express';
// import HelloRoutes from './Hello.js';
// import Lab5 from "./Lab5/index.js";
// import UserRoutes from './Kanbas/Users/routes.js';
// import CourseRoutes from "./Kanbas/Courses/routes.js";
// import cors from "cors";
// import session from "express-session";
// import "dotenv/config";
// import ModuleRoutes from "./Kanbas/Modules/routes.js";
// import mongoose from 'mongoose';
// import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
// mongoose.connect(CONNECTION_STRING);



// const app = express();
// app.use(express.json());
// app.use(
//     cors({
//       credentials: true,
//       origin: process.env.NETLIFY_URL || "http://localhost:3000",
//     })
//    );



//    const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kanbas",
//     resave: false,
//     saveUninitialized: false,
//   };
  
//   if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//       sameSite: "none",
//       secure: true,
//       domain: process.env.REMOTE_SERVER,
//     };
//   }
//   app.use(session(sessionOptions));
  





// HelloRoutes(app);
// Lab5(app);
// UserRoutes(app);
// CourseRoutes(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
// app.listen(process.env.PORT || 4000); 



import session from "express-session";
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import courses from "./Kanbas/Database/courses.js";
import cors from "cors";
import mongoose from "mongoose";
// import MongoStore from "connect-mongo";
import "dotenv/config";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
// import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
// import QuizRoutes from "./Kanbas/Quizzes/routes.js";
// import QuestionRoutes from "./Kanbas/Questions/routes.js";


const CONNECTION_STRING =
    process.env.MONGO_CONNECTION_STRING ||
    "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + CONNECTION_STRING);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

console.log(process.env.NETLIFY_URL);
const app = express();
app.use(
    cors({
        credentials: true,

        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "kanbas",
//   resave: false,
//   saveUninitialized: false,
// };

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //     mongoUrl: CONNECTION_STRING,
    //     collectionName: 'sessions'
    // }),
    // cookie: {}
};


if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        // domain: process.env.NODE_SERVER_DOMAIN,
        domain: process.env.REMOTE_SERVER
    };
}

app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
// EnrollmentRoutes(app);
// QuizRoutes(app);
// QuestionRoutes(app);

app.listen(process.env.PORT || 4000);