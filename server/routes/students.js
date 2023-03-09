import express from "express";
import { getStudentsByGrade } from "../controllers/students.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:gradeId", verifyToken, getStudentsByGrade);

export default router;