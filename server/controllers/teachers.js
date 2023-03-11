import Teacher from "../models/Teacher.js";
import fs from "fs-extra";

// READ
export const getTeachers = async (req, res) => {
  try {
    const teacher = await Teacher.find();
    res.status(200).json(teacher);
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
