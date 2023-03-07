import Teacher from "../models/Teacher.js";

// READ
export const getTeachers = async (req, res) => {
    try {
        const teacher = await Teacher.find();
        res.status(200).json(teacher);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}