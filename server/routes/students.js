import express from "express";
import { deleteStudent, getStudent, getStudentsByGrade } from "../controllers/students.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:gradeId", verifyToken, getStudentsByGrade);
router.get("/:studentId/student", verifyToken, getStudent);

//DELETE
router.delete("/:studentId/delete", verifyToken, deleteStudent);

export default router;