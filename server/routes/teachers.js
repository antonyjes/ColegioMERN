import express from "express";
import { deleteTeacher, getTeacher, getTeachers, quantityTeachers } from "../controllers/teachers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getTeachers);
router.get("/:teacherId/teacher", verifyToken, getTeacher);
router.get("/count/all", verifyToken, quantityTeachers);

//DELETE
router.delete("/:teacherId/delete", verifyToken, deleteTeacher);

export default router;
