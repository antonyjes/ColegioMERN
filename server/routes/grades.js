import express from "express";
import { createGrade, deleteGrade, editGrade, getGrade, getGrades, quantityGrades } from "../controllers/grades.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/createGrade", verifyToken, createGrade);

// READ
router.get("/:level", verifyToken, getGrades);
router.get("/:gradeId/grade", verifyToken, getGrade);
router.get("/count/all", verifyToken, quantityGrades);

// UPDATE
router.patch("/:gradeId/edit", verifyToken, editGrade);

// DELETE
router.delete("/:gradeId/delete", verifyToken, deleteGrade);

export default router;