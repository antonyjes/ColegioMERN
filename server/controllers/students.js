import Student from "../models/Student.js";
import Grade from "../models/Grade.js";
import Score from "../models/Score.js";
import fs from "fs-extra";
import bcrypt from "bcrypt";
import Attendance from "../models/Attendance.js";

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

export const getStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    res.status(201).json(student);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// UPDATE
export const editStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const {
      firstName,
      lastName,
      dni,
      password,
      phone,
      fechaNacimiento,
      nacionality,
      gradeId,
    } = req.body;
    const student = await Student.findById(studentId);
    const grade = await Grade.findById(gradeId);

    let befPicturePath = student.picturePath;

    if (req.file) {
      fs.unlink("./public/assets/students/" + befPicturePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      befPicturePath = req.file.filename;
    }

    if (password === "") {
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        {
          firstName,
          lastName,
          dni,
          phone,
          picturePath: befPicturePath,
          fechaNacimiento,
          nacionality,
          gradeId,
          gradeName: grade.gradeName,
        },
        { new: true }
      );
      await Score.updateMany(
        { studentId: studentId },
        { studentName: `${firstName} ${lastName}` }
      );
      await Attendance.updateMany(
        { studentId: studentId },
        { studentFirstName: firstName, studentLastName: lastName }
      );
      res.status(200).json(updatedStudent);
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        {
          firstName,
          lastName,
          dni,
          password: passwordHash,
          phone,
          picturePath: befPicturePath,
          fechaNacimiento,
          nacionality,
          gradeId,
          gradeName: grade.gradeName,
        },
        { new: true }
      );
      await Score.updateMany(
        { studentId: studentId },
        { studentName: `${firstName} ${lastName}` }
      );
      await Attendance.updateMany(
        { studentId: studentId },
        { studentFirstName: firstName, studentLastName: lastName }
      );
      res.status(200).json(updatedStudent);
    }
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
