import express from "express";
import { deleteScore, getScoresByCourse, registerScore } from "../controllers/scores.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/createScore", verifyToken, registerScore);

// READ
router.get("/:courseId", verifyToken, getScoresByCourse);

// DELETE
router.delete("/:scoreId/delete", verifyToken, deleteScore);

export default router;