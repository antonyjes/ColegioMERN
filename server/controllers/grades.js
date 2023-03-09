import Grade from "../models/Grade.js";

// CREATE
export const createGrade = async (req, res) => {
  try {
    const { gradeName, level } = req.body;
    const newGrade = new Grade({
      gradeName: gradeName,
      level: level,
    });
    const savedGrade = await newGrade.save();
    res.status(201).json(savedGrade);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// READ
export const getGrades = async (req, res) => {
  try {
    const { level } = req.params;
    const grade = await Grade.find({ level });
    res.status(200).json(grade);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
