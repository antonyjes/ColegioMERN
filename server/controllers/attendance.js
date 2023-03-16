import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

// CREATE
export const registerAttendance = async (req, res) => {
    try {
        const {date, attendanceData, period, gradeId} = req.body;
        const students = await Student.find({gradeId}).exec();

        students.forEach(async (student) => {
            await Attendance.findOneAndDelete({date, studentId: student._id});
        })       

        const savedAttendance = await Promise.all(attendanceData.map(async data => {
            const attendance = new Attendance({
                status: data.status,
                date: date,
                studentId: data.student._id,
                studentFirstName: data.student.firstName,
                studentLastName: data.student.lastName,
                period: period,
            })
            return attendance.save();
        }));
        res.status(201).json(savedAttendance);
    } catch (error) {
        console.log(error);
        res.status(409).json({message: error.message});
    }
}

// READ
export const getAttendance = async (req, res) => {
    try {
        const {gradeId, date} = req.params;
        const attendanceData = await Attendance.find({date: date});
        const students = await Student.find({gradeId});
        const studentsData = students.map(student => {
            const attendance = attendanceData.find(a => a.studentId.toString() === student._id.toString());
            return {
                student: {_id: student._id, firstName: student.firstName, lastName: student.lastName},
                status: attendance ? attendance.status : 'absent'
            };
        });
        res.status(200).json(studentsData);
    } catch (error) {
        console.log(error);
        res.status(409).json({message: error.message});
    }
}

export const getAttendancebyStudent = async (req, res) => {
    try {
        const {studentId} = req.params;
        const attendanceRecord = await Attendance.find({studentId, status: {$in: ["late", "absent"]}});
        res.status(200).json(attendanceRecord);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}