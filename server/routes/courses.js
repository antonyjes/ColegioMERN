import express from "express";
import { deleteCourse, getCoursesByGrade, getCoursesByTeacher, registerCourse } from "../controllers/courses.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//CREATE
router.post("/createCourse", verifyToken, registerCourse);

//READ
router.get("/:gradeId", verifyToken, getCoursesByGrade);
router.get("/:teacherId/teacher", verifyToken, getCoursesByTeacher);

//DELETE
router.delete("/:courseId/delete", verifyToken, deleteCourse);

export default router;