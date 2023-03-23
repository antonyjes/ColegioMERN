import express from "express";
import { deleteStudent, getStudent, getStudentsByGrade, quantityStudents } from "../controllers/students.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:gradeId", verifyToken, getStudentsByGrade);
router.get("/:studentId/student", verifyToken, getStudent);
router.get("/count/all", verifyToken, quantityStudents);

//DELETE
router.delete("/:studentId/delete", verifyToken, deleteStudent);

export default router;