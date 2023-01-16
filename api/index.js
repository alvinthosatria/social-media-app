import express from "express";
const app = express();
//each route has its own controllers (i.e. user.js is the controllers of users.js)
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"

//middlewares
app.use(express.json()); //to send json objects
app.use((req, res, next) => {
    //in this case we can send our cookies
    res.header("Access-Control-Allow-Credentials", true)
    //then continue doing our operations
    next();
}) 
//CORS “Cross-Origin Resource Sharing" is used so that only the localhost:3000 URL can access the API
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(cookieParser());

//whenever we go to that page, we will go to userRoutes which have different endpoints
app.use("/api/users", userRoutes) 
app.use("/api/posts", postRoutes) 
app.use("/api/likes",likeRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth",authRoutes) 

app.listen(8800, (req, res) => {
    console.log("API working!");
})