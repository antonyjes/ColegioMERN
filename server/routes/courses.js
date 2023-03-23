import express from "express";
import { deleteCourse, editCourse, getCourse, getCoursesByGrade, getCoursesByTeacher, quantityCourses, registerCourse } from "../controllers/courses.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//CREATE
router.post("/createCourse", verifyToken, registerCourse);

//READ
router.get("/:gradeId", verifyToken, getCoursesByGrade);
router.get("/:teacherId/teacher", verifyToken, getCoursesByTeacher);
router.get("/:courseId/course", verifyToken, getCourse);
router.get("/count/all", verifyToken, quantityCourses);

//UPDATE
router.patch("/:courseId/edit", verifyToken, editCourse);

//DELETE
router.delete("/:courseId/delete", verifyToken, deleteCourse);

export default router;