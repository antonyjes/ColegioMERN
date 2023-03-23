import Grade from "../models/Grade.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";

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

export const getGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const grade = await Grade.findById(gradeId);
    res.status(200).json(grade);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const quantityGrades = async (req, res) => {
  try {
    const countGrades = await Grade.countDocuments({});
    res.status(200).json(countGrades);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}

// UPDATE
export const editGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const { gradeName, level } = req.body;
    const updatedGrade = await Grade.findByIdAndUpdate(
      gradeId,
      { gradeName, level },
      { new: true }
    );
    await Course.updateMany({gradeId: gradeId}, {gradeName});
    await Student.updateMany({gradeId: gradeId}, {gradeName});
    res.status(200).json(updatedGrade);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE
export const deleteGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const deletedGrade = await Grade.findByIdAndDelete(gradeId);
    res.status(200).json(deletedGrade);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
