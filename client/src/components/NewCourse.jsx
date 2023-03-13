import Sidebar from "./Sidebar";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setTeachers } from "state";

const NewCourse = () => {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const { gradeId } = useParams();
  const teachers = useSelector((state) => state.teachers);
  const dispatch = useDispatch();

  const [nameCourse, setNameCourse] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedGradeResponse = await fetch(
      "http://localhost:3003/courses/createCourse",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameCourse: nameCourse,
          teacherId: teacherId,
          gradeId: gradeId,
        }),
      }
    );

    const savedGrade = await savedGradeResponse.json();

    if (savedGrade) {
      navigate(`/coursesByGrade/${gradeId}`);
    }
  };

  const getTeachers = async () => {
    const response = await fetch("http://localhost:3003/teachers", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setTeachers({ teachers: data }));
  };

  useEffect(() => {
    getTeachers();
  }, []); // eslint-disable-line

  return (
    <>
      <Sidebar />
      <Aside />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl font-bold mb-4">New Grade</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Course name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1° A"
                  required
                  value={nameCourse}
                  onChange={(e) => setNameCourse(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Teacher
                </label>
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Select a teacher:</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {`${teacher.firstName} ${teacher.lastName}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewCourse;
