import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
    {
        state: String,
        date: Date,
        studentId: String,
        studentName: String,
    },
    {timestamps: true}
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;