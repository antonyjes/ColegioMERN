import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        dni: {type: String, unique: true},
        password: String,
        role: String,
        phone: Number,
        picturePath: {type: String, default: ""},
        fechaNacimiento: Date,
        nacionality: String,
        gradeId: String,
        gradeName: String,
        discapacidad: {type: String, default: "Sin Discapacidad"},
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;