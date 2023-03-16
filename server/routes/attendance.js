import express from "express";
import { getAttendance, registerAttendance } from "../controllers/attendance.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/registerAttendance", verifyToken, registerAttendance);

// READ
router.get("/:gradeId/:date", verifyToken, getAttendance);

export default router;