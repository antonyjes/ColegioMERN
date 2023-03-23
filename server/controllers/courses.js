import Course from "../models/Course.js";
import Grade from "../models/Grade.js";
import Teacher from "../models/Teacher.js";
import Score from "../models/Score.js";

// CREATE
export const registerCourse = async (req, res) => {
  try {
    console.log(req.body);
    const { nameCourse, teacherId, gradeId } = req.body;
    const teacher = await Teacher.findById(teacherId);
    const grade = await Grade.findById(gradeId);
    const newCourse = new Course({
      nameCourse,
      teacherId,
      teacherName: `${teacher.firstName} ${teacher.lastName}`,
      gradeId,
      gradeName: grade.gradeName,
      level: grade.level,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }
};

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

export const getCoursesByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const course = await Course.find({ teacherId });
    res.status(201).json(course);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    res.status(201).json(course);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const quantityCourses = async (req, res) => {
  try {
    const countCourses = await Course.countDocuments({});
    res.status(201).json(countCourses);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}

// UPDATE
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { nameCourse, teacherId, gradeId } = req.body;
    const teacher = await Teacher.findById(teacherId);
    const grade = await Grade.findById(gradeId);
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        nameCourse,
        teacherId,
        teacherName: `${teacher.firstName} ${teacher.lastName}`,
        gradeId,
        gradeName: grade.gradeName,
        level: grade.level,
      },
      { new: true }
    );
    await Score.updateMany({courseId: courseId}, {courseName: nameCourse});
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    res.status(200).json(deletedCourse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
