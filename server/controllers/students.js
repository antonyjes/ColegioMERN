import Student from "../models/Student.js";
import fs from "fs-extra";

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

// DELETE
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    const filePath = "./public/assets/students/" + deletedStudent.picturePath;
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
    }
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
