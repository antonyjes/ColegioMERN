import Teacher from "../models/Teacher.js";
import fs from "fs-extra";
import bcrypt from "bcrypt";
import Course from "../models/Course.js";

// READ
export const getTeachers = async (req, res) => {
  try {
    const teacher = await Teacher.find();
    res.status(200).json(teacher);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teacher.findById(teacherId);
    res.status(200).json(teacher);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// UPDATE
export const editTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { firstName, lastName, email, password, phone, area } = req.body;
    const teacher = await Teacher.findById(teacherId);

    let befPicturePath = teacher.picturePath;

    if (req.file) {
      fs.unlink("./public/assets/teachers/" + befPicturePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      befPicturePath = req.file.filename;
    }

    if (password === "") {
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        {
          firstName,
          lastName,
          email,
          phone,
          picturePath: befPicturePath,
          area,
        },
        { new: true }
      );
      await Course.updateMany(
        { teacherId: teacherId },
        { teacherName: `${firstName} ${lastName}` }
      );
      res.status(200).json(updatedTeacher);
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        {
          firstName,
          lastName,
          email,
          password: passwordHash,
          phone,
          picturePath: befPicturePath,
          area,
        },
        { new: true }
      );
      await Course.updateMany(
        { teacherId: teacherId },
        { teacherName: `${firstName} ${lastName}` }
      );
      res.status(200).json(updatedTeacher);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE
export const deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    const filePath = "./public/assets/teachers/" + deletedTeacher.picturePath;
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
    }
    res.status(200).json(deletedTeacher);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
