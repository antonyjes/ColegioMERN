import express from "express";
import { deleteCourse, getCoursesByGrade, registerCourse } from "../controllers/courses.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//CREATE
router.post("/createCourse", verifyToken, registerCourse);

//READ
router.get("/:gradeId", verifyToken, getCoursesByGrade);

//DELETE
router.delete("/:courseId/delete", verifyToken, deleteCourse);

export default router;