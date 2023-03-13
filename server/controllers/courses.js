import Course from "../models/Course.js";

// READ
export const getCoursesByGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const course = await Course.find({ gradeId });
    res.status(201).json(course);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
