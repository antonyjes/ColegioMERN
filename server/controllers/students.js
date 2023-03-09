import Student from "../models/Student.js";

// READ
export const getStudentsByGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const student = await Student.find({ gradeId });
    res.status(201).json(student);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
