import express from "express";
import { deleteTeacher, getTeachers } from "../controllers/teachers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getTeachers);

//DELETE
router.delete("/:teacherId/delete", verifyToken, deleteTeacher);

export default router;
