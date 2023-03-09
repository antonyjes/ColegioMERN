import express from "express";
import { createGrade, getGrades } from "../controllers/grades.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/createGrade", verifyToken, createGrade);

// READ
router.get("/:level", verifyToken, getGrades);

export default router;