import Aside from "./Aside";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { setStudents } from "state";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StudentsByGradeAttendance = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const students = useSelector((state) => state.students);
  const token = useSelector((state) => state.token);
  const { gradeId } = useParams();

  const getStudents = async () => {
    const response = await fetch(`http://localhost:3003/students/${gradeId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setStudents({ students: data }));
  };

  const getAttendanceData = async () => {
    const response = await fetch(
      `http://localhost:3003/attendance/${gradeId}/${date}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setAttendanceData(data);
  };

  useEffect(() => {
    getStudents();
    getAttendanceData();
  }, [gradeId, date]); // eslint-disable-line

  const handleInputChange = (index, e) => {
    const { value } = e.target;
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[index].status = value;
    setAttendanceData(updatedAttendanceData);
  };

  const handleSaveAttendance = async (e) => {
    try {
      e.preventDefault();
      const savedAttendanceResponse = await fetch(
        "http://localhost:3003/attendance/registerAttendance",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: date,
            attendanceData: attendanceData,
            period: new Date().getFullYear(),
            gradeId: gradeId,
          }),
        }
      );

      const savedAttendance = await savedAttendanceResponse.json();
      if (savedAttendance) {
        alert("Attendance data saved successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Merge attendance data with student data
  const mergedData = students.map((student) => {
    const attendance = attendanceData.find(
      (data) => data.student._id === student._id
    );
    return attendance ? attendance : { student: student, status: "absent" };
  });

  return (
    <>
      <Sidebar />
      <Aside />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Attendance</h2>
            <div className="flex mb-4">
              <label htmlFor="date" className="mr-4">
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border rounded-md mr-4"
              />
            </div>
            <div>
              <table className="w-full mb-4">
                <thead>
                  <tr>
                    <th className="text-left">Student Name</th>
                    <th className="text-left">Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mergedData.map((data, index) => (
                    <tr key={data.student._id}>
                      <td className="py-2">{`${data.student.firstName} ${data.student.lastName}`}</td>
                      <td className="py-2">
                        <select
                          value={data.status}
                          onChange={(e) => handleInputChange(index, e)}
                          className="p-2 border rounded-md"
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleSaveAttendance}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsByGradeAttendance;
