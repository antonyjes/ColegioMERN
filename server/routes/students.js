import express from "express";
import { deleteStudent, getStudentsByGrade } from "../controllers/students.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:gradeId", verifyToken, getStudentsByGrade);

//DELETE
router.delete("/:studentId/delete", verifyToken, deleteStudent);

export default router;