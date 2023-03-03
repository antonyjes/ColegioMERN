import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

//REGISTER USER
export const registerAdmin = async(req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({
            firstName, lastName, email, password: passwordHash, picturePath: req.file ? req.file.filename : ""
        });
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}