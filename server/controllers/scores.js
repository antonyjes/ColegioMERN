import Course from "../models/Course.js";
import Score from "../models/Score.js";
import Student from "../models/Student.js";

// CREATE
export const registerScore = async (req, res) => {
  try {
    const {
      score1,
      score2,
      score3,
      score4,
      promedio,
      studentId,
      courseId,
      period,
    } = req.body;
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    const newScore = new Score({
      score1,
      score2,
      score3,
      score4,
      promedio,
      studentId,
      studentName: `${student.firstName} ${student.lastName}`,
      courseId,
      courseName: course.nameCourse,
      period,
    });
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// READ
export const getScoresByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const score = await Score.find({ courseId });
    res.status(201).json(score);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getScoresByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const score = await Score.find({ studentId });
    res.status(201).json(score);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getScore = async (req, res) => {
  try {
    const { scoreId } = req.params;
    const score = await Score.findById(scoreId);
    res.status(201).json(score);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// UPDATE
export const editScore = async (req, res) => {
  try {
    const { scoreId } = req.params;
    const {
      score1,
      score2,
      score3,
      score4,
      promedio,
      studentId,
      courseId,
      period,
    } = req.body;
    const updatedScore = await Score.findByIdAndUpdate(
      scoreId,
      { score1, score2, score3, score4, promedio, studentId, courseId, period },
      { new: true }
    );
    res.status(200).json(updatedScore);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE
export const deleteScore = async (req, res) => {
  try {
    const { scoreId } = req.params;
    const deletedScore = await Score.findByIdAndDelete(scoreId);
    res.status(200).json(deletedScore);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
