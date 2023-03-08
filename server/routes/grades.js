import express from "express";
import { getGrades } from "../controllers/grades.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:level", verifyToken, getGrades);

export default router;