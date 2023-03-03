import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema(
    {
        gradeName: String,
        level: {type: String, enum: ['Primaria', 'Secundaria']}
    },
    {timestamps: true}
);

const Grade = mongoose.model("Grade", GradeSchema);
export default Grade;