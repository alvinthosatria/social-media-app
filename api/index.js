import express from "express";
const app = express();
//each route has its own controllers (i.e. user.js is the controllers of users.js)
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import relationshipRoutes from "./routes/relationships.js"
import cors from "cors"
import multer from "multer"
import cookieParser from "cookie-parser"
import path from 'path';
const __dirname = path.resolve();

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


//For uploading files use multer
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
},
filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
}
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).send(file.filename)
})

//whenever we go to that page, we will go to userRoutes which have different endpoints
app.use("/api/users", userRoutes) 
app.use("/api/posts", postRoutes) 
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/relationships", relationshipRoutes)
app.use(express.static(path.join(__dirname + "/public"))) //for deployment

app.listen(8800, (req, res) => {
    console.log("API working!");
})