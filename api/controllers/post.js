import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not logged in")

    //validate the token
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).send("Token is not valid!")

        //select everything from post such that you can see your posts and followed people posts
        //and also take the user id, name, and profile picture of each post
        const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? 
        ORDER BY p.createdAt DESC`;

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(data);
        })
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).send("Token is not valid!")

       
        const q = `INSERT INTO posts ("desc", "img", "createdAt", "userId") VALUES ?`;

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now().format("YYYY-MM-DD HH:mm:ss")),
            userInfo.id
        ]

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(data);
        })
    })
}