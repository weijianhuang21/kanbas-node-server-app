// console.log("Hello World from Hello.js!");
export default function HelloRoutes(app) 
{app.get("/hello", (req, res) => {res.send("Life is good! Hello World!")});
app.get("/", (req, res) => {res.send("Welcome to Web Development!")});}