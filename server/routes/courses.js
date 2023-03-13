import express from "express";
import { getCoursesByGrade } from "../controllers/courses.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:gradeId", verifyToken, getCoursesByGrade);

export default router;