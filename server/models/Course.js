import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        nameCourse: String,
        teacherId: String,
        teacherName: String,
        gradeId: String,
        gradeName: String,
        level: String,
    },
    {timestamps: true}
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;