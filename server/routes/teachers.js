import express from "express";
import { getTeachers } from "../controllers/teachers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getTeachers);

export default router;
