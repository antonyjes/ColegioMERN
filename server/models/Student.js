import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        dni: {type: String, unique: true},
        password: String,
        role: {type: String, default: "student"},
        phone: String,
        picturePath: {type: String, default: ""},
        fechaNacimiento: Date,
        nacionality: String,
        grade: String,
        discapacidad: {type: String, default: "Sin Discapacidad"},
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;