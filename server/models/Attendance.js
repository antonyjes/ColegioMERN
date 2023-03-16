import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
    {
        status: String,
        date: Date,
        studentId: String,
        studentFirstName: String,
        studentLastName: String,
        period: String,
    },
    {timestamps: true}
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;