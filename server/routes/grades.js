import express from "express";
import { createGrade, deleteGrade, getGrades } from "../controllers/grades.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/createGrade", verifyToken, createGrade);

// READ
router.get("/:level", verifyToken, getGrades);

// DELETE
router.delete("/:gradeId/delete", verifyToken, deleteGrade);

export default router;