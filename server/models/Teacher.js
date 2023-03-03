import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {type: String, unique: true},
        password: String,
        role: {type: String, default: "teacher"},
        phone: String,
        picturePath: {type: String, default: ""},
        area: {type: String, enum: ['Matematicas', 'Comunicacion', 'CTA', 'Deportes', 'Religion', 'Ingles']}
    },
    { timestamps: true }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;