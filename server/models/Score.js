import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema(
    {
        score1: Number,
        score2: Number,
        score3: Number,
        score4: Number,
        promedio: Number,
        studentId: String,
        studentName: String,
        courseId: String,
        courseName: String,
    },
    {timestamps: true}
);

const Score = mongoose.model("Score", ScoreSchema);
export default Score;