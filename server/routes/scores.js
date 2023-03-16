import express from "express";
import { deleteScore, getScoresByCourse, getScoresByStudent, registerScore } from "../controllers/scores.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/createScore", verifyToken, registerScore);

// READ
router.get("/:courseId/course", verifyToken, getScoresByCourse);
router.get("/:studentId/student", verifyToken, getScoresByStudent);

// DELETE
router.delete("/:scoreId/delete", verifyToken, deleteScore);

export default router;