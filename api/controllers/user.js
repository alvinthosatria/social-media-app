import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).send(err);

        //extract the password
        const { password, ...info } = data[0];
        return res.send(info);
    })

}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).send("Token is not valid!");

        const q = "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const values = [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverPic,
            req.body.profilePic,
            userInfo.id,
        ]

        db.query(q, values, (err, data) => {
            if (err) res.status(500).send(err);
            if (data.affectedRows > 0) return res.send("Updated!");
            return res.status(403).send("You can update only your post!")
        })
    }) 
}