import Grade from "../models/Grade.js";

// READ
export const getGrades = async (req, res) => {
    try {
        const { level } = req.params;
        const grade = await Grade.find({level});
        res.status(200).json(grade);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}